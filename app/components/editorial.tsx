import Link from "next/link";

export const languages = [
  { code: "en", short: "EN", name: "English" },
  { code: "sk", short: "SK", name: "Slovenčina" },
  { code: "cs", short: "CZ", name: "Čeština" },
  { code: "de", short: "DE", name: "Deutsch" },
  { code: "uk", short: "UA", name: "Українська" },
];

export const categories = [
  ["Všetko", "all"], ["Andragogika", "andragogika"], ["Bezpečnostné vedy", "bezpecnostne-vedy"],
  ["Knižnica", "kniznica"], ["Konferencie", "konferencie"], ["Medzinárodné právo", "medzinarodne-pravo"],
  ["Občianske právo", "obcianske-pravo"], ["Ošetrovateľstvo", "osetrovatelstvo"],
];

export function Icon({ name }: { name: "menu" | "search" | "eye" | "globe" | "pen" }) {
  const glyph = { menu: "☰", search: "⌕", eye: "◉", globe: "◎", pen: "✎" }[name];
  return <span aria-hidden="true">{glyph}</span>;
}

export function Header({ lang = "sk" }: { lang?: string }) {
  const current = languages.find((l) => l.code === lang) ?? languages[1];
  return <>
    <header className="mx-auto flex h-[72px] max-w-[1460px] items-center border-b border-stone-300 px-3 text-[15px] sm:px-5">
      <div className="flex w-28 items-center gap-7 text-[25px]">
        <Link aria-label="Otvoriť kategórie" href={`/${lang}/categories`}><Icon name="menu" /></Link>
        <Link aria-label="Hľadať" href={`/${lang}/search`}><Icon name="search" /></Link>
      </div>
      <nav className="hidden flex-1 justify-center gap-10 md:flex">
        <Link className="border-b border-black pb-2" href="/">Úvod</Link>
        <Link className="pb-2" href={`/${lang}/categories`}>Kategórie</Link>
        <Link className="pb-2" href={`/${lang}/category/podcast`}>Podcast</Link>
        <Link className="pb-2" href={`/${lang}/about`}>O projekte</Link>
        <Link className="pb-2" href={`/${lang}/subscribe`}>Predplatiť</Link>
      </nav>
      <div className="ml-auto flex items-center gap-5">
        <Link className="hidden border border-stone-300 px-5 py-2 sm:block" href={`/${lang}/for-authors`}>Pre autorov</Link>
        <details className="language-menu relative">
          <summary className="flex cursor-pointer list-none items-center gap-2"><span className="text-[24px]"><Icon name="globe" /></span><span>{current.short}</span></summary>
          <div className="absolute right-0 z-30 mt-3 min-w-44 border border-stone-300 bg-[#fbfaf7] py-2 shadow-sm">
            {languages.map((language) => <Link key={language.code} className="block px-4 py-2 hover:bg-stone-100" href={`/${language.code}/category/bezpecnostne-vedy`}>{language.name}</Link>)}
          </div>
        </details>
      </div>
    </header>
    <section className="mx-auto flex h-[132px] max-w-[1460px] flex-col items-center justify-center border-b border-stone-400">
      <Link href="/" className="font-serif text-[52px] font-semibold leading-none tracking-[-2px] sm:text-[76px]"><span className="text-[#965723]">Pro</span>Human</Link>
      <p className="mt-3 text-[10px] tracking-[.52em] sm:text-[12px]">VEDA · ĽUDSKOSŤ · SPOLOČNOSŤ</p>
    </section>
  </>;
}

export function CategoryNav({ lang = "sk", active = "all" }: { lang?: string; active?: string }) {
  return <div className="mx-auto flex h-12 max-w-[1460px] items-center overflow-x-auto whitespace-nowrap border-b border-stone-400 px-1 text-[13px] [scrollbar-width:none] sm:px-2">
    <div className="flex min-w-max flex-1 items-center gap-10">{categories.map(([label, slug]) => <Link key={slug} href={`/${lang}/category/${slug}`} className={slug === active ? "border-b border-black py-[15px]" : "py-[15px]"}>{label}</Link>)}</div>
    <Link className="sticky right-0 ml-8 bg-[#fbfaf7] px-3" href={`/${lang}/categories`}>Viac　⌄</Link>
  </div>;
}

export function SiteChrome({ children, lang = "sk", active }: { children: React.ReactNode; lang?: string; active?: string }) {
  return <main><Header lang={lang}/><CategoryNav lang={lang} active={active}/>{children}</main>;
}
