import type { Dictionary } from "@/types";

export function PhotographiesView({ dictionary }: { dictionary: Dictionary }) {
  return (
    <div className="mx-auto w-full max-w-[1128px] px-5 pt-16 pb-20 lg:pt-24 lg:pb-40">
      <div className="flex flex-col gap-2 pl-4">
        <h1 className="text-2xl leading-8 font-semibold text-black">
          {dictionary.photographies.title}
        </h1>
        <p className="text-sm leading-5 text-slate-600">{dictionary.photographies.body}</p>
      </div>
    </div>
  );
}
