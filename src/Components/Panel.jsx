/**
 * A titled section of the dashboard with optional controls aligned to the right of the heading.
 * `plain` drops the card surface, for content that should sit directly on the page.
 */
export default function Panel({ id, title, description, actions, children, plain = false, className = "" }) {
  const headingId = `${id}-heading`;

  return (
    <section
      aria-labelledby={headingId}
      className={`${plain ? "" : "rounded-3xl border border-line bg-surface p-5 sm:p-7"} ${className}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h2 id={headingId} className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
            {title}
          </h2>
          {description && <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">{description}</p>}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
