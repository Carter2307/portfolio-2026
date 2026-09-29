import type { FrameUniforms } from './types'

const MOUSE_EASING = 0.12
const AMOUNT_EASING = 0.06
/** Frozen time used when the user prefers reduced motion (a pleasing frame). */
const STILL_TIME = 14

/**
 * Pure animation state: time and eased pointer. No DOM, no GPU,
 * so it can be driven by any loop (or tested) in isolation.
 */
export class DitherScene {
  time: number

  private readonly reducedMotion: boolean
  private mouseX = 0
  private mouseY = 0
  private targetX = 0
  private targetY = 0
  private amount = 0
  private targetAmount = 0

  constructor(reducedMotion: boolean) {
    this.reducedMotion = reducedMotion
    this.time = reducedMotion ? STILL_TIME : 0
  }

  /** Pointer position in grid cells, origin bottom-left. */
  pointerMove(x: number, y: number): void {
    this.targetX = x
    this.targetY = y
    // Coming back from idle: jump to the pointer instead of sliding in from afar.
    if (this.targetAmount === 0 && this.amount < 0.02) {
      this.mouseX = x
      this.mouseY = y
    }
    this.targetAmount = 1
  }

  pointerLeave(): void {
    this.targetAmount = 0
  }

  advance(seconds: number, speed: number): void {
    this.time += seconds * speed
  }

  /** Eases the pointer one step toward its target. Called once per drawn frame. */
  ease(): void {
    this.mouseX += (this.targetX - this.mouseX) * MOUSE_EASING
    this.mouseY += (this.targetY - this.mouseY) * MOUSE_EASING
    this.amount += (this.targetAmount - this.amount) * AMOUNT_EASING
  }

  uniforms(width: number, height: number): FrameUniforms {
    return {
      resolution: [width, height],
      mouse: [this.mouseX, this.mouseY],
      time: this.time,
      amount: this.reducedMotion ? 0 : this.amount,
    }
  }
}
