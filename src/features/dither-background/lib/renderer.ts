import { getShader, shaderSource, type ShaderId } from '../shaders'
import type { FrameUniforms } from './types'

// Must match the `Uniforms` struct in common.wgsl: 8 × f32 = 32 bytes.
const UNIFORM_FLOATS = 8

/**
 * Thin WebGPU wrapper: owns the device, the canvas context and one
 * full-screen pipeline per shader variant. It knows nothing about the DOM
 * beyond its canvas.
 */
export class DitherRenderer {
  readonly lost: Promise<GPUDeviceLostInfo>

  private readonly device: GPUDevice
  private readonly context: GPUCanvasContext
  private readonly format: GPUTextureFormat
  private readonly pipelineLayout: GPUPipelineLayout
  private readonly uniformBuffer: GPUBuffer
  private readonly bindGroup: GPUBindGroup
  private readonly uniformData = new Float32Array(UNIFORM_FLOATS)
  /** Compiled (or compiling) pipelines, so switching back is instant. */
  private readonly pipelines = new Map<ShaderId, Promise<GPURenderPipeline>>()

  private active: GPURenderPipeline | null = null
  private activeId: ShaderId | null = null
  private requestedId: ShaderId | null = null

  private constructor(device: GPUDevice, context: GPUCanvasContext, format: GPUTextureFormat) {
    this.device = device
    this.context = context
    this.format = format
    this.lost = device.lost

    // One explicit layout shared by every variant, so a single bind group serves them all.
    const bindGroupLayout = device.createBindGroupLayout({
      label: 'dither uniforms layout',
      entries: [{ binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }],
    })
    this.pipelineLayout = device.createPipelineLayout({ bindGroupLayouts: [bindGroupLayout] })
    this.uniformBuffer = device.createBuffer({
      label: 'dither uniforms',
      size: UNIFORM_FLOATS * Float32Array.BYTES_PER_ELEMENT,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    this.bindGroup = device.createBindGroup({
      layout: bindGroupLayout,
      entries: [{ binding: 0, resource: { buffer: this.uniformBuffer } }],
    })
  }

  static isSupported(): boolean {
    return typeof navigator !== 'undefined' && 'gpu' in navigator
  }

  /**
   * Resolves to `null` when WebGPU is unavailable or when `signal` aborts
   * mid-way. An aborted call never touches the canvas context, so a stale
   * init (React StrictMode, HMR) cannot unconfigure a newer renderer.
   */
  static async create(
    canvas: HTMLCanvasElement,
    shader: ShaderId,
    signal: AbortSignal,
  ): Promise<DitherRenderer | null> {
    if (!DitherRenderer.isSupported()) return null

    const adapter = await navigator.gpu.requestAdapter({ powerPreference: 'low-power' })
    if (!adapter || signal.aborted) return null

    const device = await adapter.requestDevice({ label: 'dither background' })
    if (signal.aborted) {
      device.destroy()
      return null
    }

    const context = canvas.getContext('webgpu')
    if (!context) {
      device.destroy()
      return null
    }

    const format = navigator.gpu.getPreferredCanvasFormat()
    const renderer = new DitherRenderer(device, context, format)
    try {
      await renderer.use(shader)
    } catch (error) {
      device.destroy()
      throw error
    }

    if (signal.aborted) {
      device.destroy()
      return null
    }

    context.configure({ device, format, alphaMode: 'opaque' })
    return renderer
  }

  /** The shader currently drawn (the last requested one may still be compiling). */
  get shader(): ShaderId | null {
    return this.activeId
  }

  /**
   * Switches to `id`, compiling its pipeline on first use. Resolves to
   * `false` when a newer call superseded this one before it was ready.
   */
  async use(id: ShaderId): Promise<boolean> {
    this.requestedId = id
    const pipeline = await this.pipeline(id)
    if (this.requestedId !== id) return false
    this.active = pipeline
    this.activeId = id
    return true
  }

  render(frame: FrameUniforms): void {
    if (!this.active) return

    const data = this.uniformData
    data[0] = frame.resolution[0]
    data[1] = frame.resolution[1]
    data[2] = frame.mouse[0]
    data[3] = frame.mouse[1]
    data[4] = frame.time
    data[5] = frame.amount
    data[6] = frame.focus[0]
    data[7] = frame.focus[1]
    this.device.queue.writeBuffer(this.uniformBuffer, 0, data)

    const encoder = this.device.createCommandEncoder()
    const pass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: this.context.getCurrentTexture().createView(),
          loadOp: 'clear',
          storeOp: 'store',
          clearValue: { r: 0, g: 0, b: 0, a: 1 },
        },
      ],
    })
    pass.setPipeline(this.active)
    pass.setBindGroup(0, this.bindGroup)
    pass.draw(3)
    pass.end()
    this.device.queue.submit([encoder.finish()])
  }

  destroy(): void {
    this.context.unconfigure()
    this.uniformBuffer.destroy()
    this.device.destroy()
  }

  private pipeline(id: ShaderId): Promise<GPURenderPipeline> {
    const cached = this.pipelines.get(id)
    if (cached) return cached

    const module = this.device.createShaderModule({ label: `${id} shader`, code: shaderSource(id) })
    const pending = this.device.createRenderPipelineAsync({
      label: `${id} pipeline`,
      layout: this.pipelineLayout,
      vertex: { module, entryPoint: 'vs_main' },
      fragment: {
        module,
        entryPoint: 'fs_main',
        targets: [{ format: this.format }],
        constants: getShader(id).constants,
      },
      primitive: { topology: 'triangle-list' },
    })
    // Forget failures so a later request can retry.
    pending.catch(() => this.pipelines.delete(id))
    this.pipelines.set(id, pending)
    return pending
  }
}
