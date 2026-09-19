import { Button, Card, CardConnector, ExperienceCard, RichText } from "@/components";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/types";

const SOCIAL_LINK_CLASS = "font-bold underline decoration-from-font hover:text-black";

export function HomeView({ dictionary }: { dictionary: Dictionary }) {
  const { actions, home } = dictionary;

  return (
    <div className="mx-auto grid w-full max-w-[1128px] grid-cols-1 gap-9 px-5 pt-16 pb-20 lg:grid-cols-[1fr_444px] lg:grid-rows-[auto_auto_1fr] lg:items-start lg:gap-x-0 lg:gap-y-12 lg:pt-24 lg:pb-40">
      <div className="flex items-end justify-between gap-6 lg:col-start-1 lg:row-start-1 lg:block">
        <div className="flex w-[187px] flex-col gap-2 pl-4">
          <h1 className="text-2xl leading-8 font-semibold text-black">{home.name}</h1>
          <p className="text-base leading-6 font-medium text-slate-500">{home.role}</p>
        </div>
        <Button
          variant="secondary"
          className="lg:hidden"
          render={<a href={`mailto:${siteConfig.email}`} />}
        >
          {actions.emailMe}
        </Button>
      </div>

      <section className="flex flex-col gap-3 pl-4 lg:col-start-1 lg:row-start-2">
        <h2 className="text-base leading-6 font-semibold text-gray-700">
          {home.description.title}
        </h2>
        <p className="text-sm leading-5 text-slate-600 lg:max-w-[520px]">{home.description.body}</p>
      </section>

      <div className="flex flex-col gap-4 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:gap-0">
        <Card title={home.experiences.title}>
          {home.experiences.items.map((item, index) => (
            <ExperienceCard
              key={`${item.company}-${index}`}
              title={item.company}
              period={item.period}
              subtitle={item.role}
            />
          ))}
        </Card>

        <CardConnector />

        <Card title={home.formations.title}>
          {home.formations.items.map((item, index) => (
            <ExperienceCard
              key={`${item.title}-${index}`}
              overline={item.level}
              title={item.title}
              period={item.period}
              subtitle={item.school}
            />
          ))}
        </Card>
      </div>

      <section className="flex flex-col gap-3 pl-4 lg:col-start-1 lg:row-start-3">
        <h2 className="text-lg leading-7 font-semibold text-black">{home.more.title}</h2>
        <p className="text-sm leading-5 text-slate-700">
          <RichText
            template={home.more.body}
            values={{
              twitter: (
                <a
                  className={SOCIAL_LINK_CLASS}
                  href={siteConfig.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  {home.more.twitter}
                </a>
              ),
              github: (
                <a
                  className={SOCIAL_LINK_CLASS}
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  {home.more.github}
                </a>
              ),
            }}
          />
        </p>
      </section>
    </div>
  );
}
