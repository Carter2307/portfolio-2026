import { notFound } from "next/navigation";
import { lang } from "next/root-params";

import type { Dictionary } from "@/types";

import { isLocale, type Locale } from "./config";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import("./messages/fr.json").then((module) => module.default),
  en: () => import("./messages/en.json").then((module) => module.default),
};

/**
 * Reads the locale from the `[lang]` root segment, so server components deep in
 * the tree never have to drill it down as a prop. A segment the proxy could not
 * produce is a 404 rather than a runtime error.
 */
export async function getLocale(): Promise<Locale> {
  const locale = await lang();

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function getDictionary(locale?: string): Promise<Dictionary> {
  if (locale === undefined) {
    return dictionaries[await getLocale()]();
  }

  if (!isLocale(locale)) {
    notFound();
  }

  return dictionaries[locale]();
}
