import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

/** Highest quality-rated tag of an `Accept-Language` header, e.g. `fr-fr`. */
function preferredLanguage(header: string): string | undefined {
  return header
    .split(",")
    .map((entry) => {
      const [tag, ...parameters] = entry.trim().split(";");
      const quality = parameters.find((parameter) => parameter.trim().startsWith("q="));

      return {
        tag: tag.trim().toLowerCase(),
        quality: quality ? Number.parseFloat(quality.split("=")[1]) : 1,
      };
    })
    .filter((entry) => entry.tag.length > 0 && !Number.isNaN(entry.quality))
    .sort((a, b) => b.quality - a.quality)
    .at(0)?.tag;
}

function resolveLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");

  if (!header) {
    return defaultLocale;
  }

  // French speakers stay on the default locale, every other language gets English.
  return preferredLanguage(header)?.startsWith("fr") ? "fr" : "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, firstSegment] = pathname.split("/");

  if (isLocale(firstSegment)) {
    return;
  }

  request.nextUrl.pathname = `/${resolveLocale(request)}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|icons|.*\\.[\\w]+$).*)"],
};
