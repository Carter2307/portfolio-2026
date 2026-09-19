export interface ExperienceCardProps {
  /** Small line above the title, e.g. the degree level. */
  overline?: string;
  title: string;
  period: string;
  subtitle: string;
}

export function ExperienceCard({ overline, title, period, subtitle }: ExperienceCardProps) {
  return (
    <article className="group flex w-full px-4 py-3">
      <div className="flex flex-1 flex-col gap-1 border-b border-gray-200 pb-3 group-last:border-transparent">
        {overline ? <p className="text-xs leading-4 text-slate-600">{overline}</p> : null}
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm leading-5 font-semibold text-slate-700">{title}</p>
          <p className="shrink-0 text-sm leading-5 text-slate-400">{period}</p>
        </div>
        <p className="text-sm leading-5 text-slate-600">{subtitle}</p>
      </div>
    </article>
  );
}
