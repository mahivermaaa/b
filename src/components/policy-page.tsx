import type { Metadata } from "next";

export type PolicySection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export const policyMetadata = (title: string, description: string): Metadata => ({
  title,
  description,
});

export function PolicyPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
  wide = false,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
  wide?: boolean;
}) {
  return (
    <main id="main">
      <article className={`policy-page section${wide ? " is-wide" : ""}`}>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p className="policy-updated">Last updated: {updated}</p>
        <p>{intro}</p>
        {sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((text) => <p key={text}>{text}</p>)}
            {section.list && (
              <ul>
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </main>
  );
}
