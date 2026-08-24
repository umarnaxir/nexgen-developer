export default function BlogsHero() {
  return (
    <header className="hero-glow relative flex h-[50vh] min-h-[50vh] flex-col justify-end overflow-hidden pb-10 pt-[calc(var(--site-nav-height)+1.5rem)] sm:pb-12 sm:pt-[calc(var(--site-nav-height)+2.5rem)] lg:pb-14 lg:pt-[calc(var(--site-nav-height)+3rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_50%,rgba(230,201,166,0.16)_1px,transparent_1px)] bg-[length:48px_48px] opacity-50"
      />

      <div className="relative z-10 px-4 sm:px-6 lg:px-14">
        <div className="mx-auto flex w-full max-w-7xl flex-col">
          <span className="mb-6 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.35em] text-gold-dark">
            <span className="h-px w-8 bg-gold" />
            Our Blog
          </span>
          <h1 className="w-full text-[clamp(1.85rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-primary">
            Insights & updates.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-gray sm:mt-6 sm:text-lg">
            Tips and updates from the NexGen Developers team.
          </p>
        </div>
      </div>
    </header>
  );
}
