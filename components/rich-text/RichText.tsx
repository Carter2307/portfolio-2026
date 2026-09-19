import { Fragment, type ReactNode } from "react";

const TOKEN_PATTERN = /(\{[a-zA-Z0-9_]+\})/g;

export interface RichTextProps {
  /** Sentence with `{token}` placeholders, typically coming from a dictionary. */
  template: string;
  values: Record<string, ReactNode>;
}

/**
 * Splits a translated sentence on its `{token}` placeholders so inline links
 * stay under the translator's control instead of being hardcoded around the
 * text.
 */
export function RichText({ template, values }: RichTextProps) {
  return (
    <>
      {template.split(TOKEN_PATTERN).map((chunk, index) => {
        const token = chunk.startsWith("{") && chunk.endsWith("}") ? chunk.slice(1, -1) : undefined;

        return <Fragment key={index}>{token && token in values ? values[token] : chunk}</Fragment>;
      })}
    </>
  );
}
