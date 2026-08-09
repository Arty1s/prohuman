import Link from "next/link";
import { Icon, SiteChrome } from "../../../components/editorial";
import { getCategoryArticles } from "../../../../lib/backend";
import type { Locale } from "../../../../lib/contracts";

const copy: Record<string, { title: string; intro: string }> = {
  sk: { title: "Bezpečnostné vedy", intro: "Odborné články, analýzy a výskum z oblasti bezpečnosti, krízového riadenia a ochrany spoločnosti." },
  en: { title: "Security Sciences", intro: "Research, analysis and professional perspectives on security, crisis management and society." },
  cs: { title: "Bezpečnostní vědy", intro: "Odborné články, analýzy a výzkum z oblasti bezpečnosti a krizového řízení." },
  de: { title: "Sicherheitswissenschaften", intro: "Forschung und Analysen zu Sicherheit, Krisenmanagement und Gesellschaft." },
  uk: { title: "Науки про безпеку", intro: "Дослідження та аналітика з питань безпеки, кризового управління та суспільства." },
};

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ lang: string; slug: string }>; searchParams: Promise<{ page?: string }> }) {
  const { lang, slug } = await params;
  const requestedPage = Math.max(1, Number((await searchParams).page) || 1);
  const listing = await getCategoryArticles(lang as Locale, slug, requestedPage);
  const text = copy[lang] ?? copy.sk;
  const active = slug === "bezpecnostne-vedy" ? slug : "all";
  return <SiteChrome lang={lang} active={active}>
    <div className="mx-auto max-w-[1460px] px-3 pb-14 sm:px-2">
      <header className="border-b border-stone-400 py-10 sm:flex sm:items-end sm:justify-between">
        <div><p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#965723]">Kategória</p><h1 className="mt-2 font-serif text-4xl font-semibold sm:text-5xl">{text.title}</h1><p className="mt-4 max-w-2xl text-[15px] leading-6">{text.intro}</p></div>
        <p className="mt-5 text-[12px] sm:mt-0">{listing.totalItems} článkov</p>
      </header>
      <section aria-label="Zoznam článkov">{listing.items.map((item, index) => <article key={item.id} className="grid gap-5 border-b border-stone-300 py-6 sm:grid-cols-[300px_1fr] sm:gap-8 lg:grid-cols-[360px_1fr]">
        <Link href={`/${lang}/article/${item.slug}`} className={`article-image ${["article-image--conference", "article-image--microphone", "article-image--books"][index % 3]} min-h-[185px]`} aria-label={item.title}/>
        <div className="flex flex-col"><p className="text-[10px] font-semibold text-[#965723]">{item.category.name.toUpperCase()}</p><h2 className="mt-3 max-w-3xl font-serif text-[28px] font-semibold leading-[1.08]"><Link href={`/${lang}/article/${item.slug}`}>{item.title}</Link></h2><p className="mt-3 max-w-2xl text-[14px] leading-[1.55]">{item.excerpt}</p><div className="mt-auto flex gap-3 pt-5 text-[10px]"><span>{item.author.name.toUpperCase()}</span><span>·</span><span>{new Date(item.publishedAt).toLocaleDateString(lang)}</span><span>·</span><span><Icon name="eye" /> {item.viewCount.toLocaleString(lang)}</span></div></div>
      </article>)}</section>
      <nav aria-label="Stránkovanie" className="mt-9 flex items-center justify-center gap-2 text-[13px]">{Array.from({ length: Math.min(3, listing.totalPages) }, (_, i) => i + 1).map((page) => page === listing.page ? <span key={page} className="border border-black bg-black px-4 py-2 text-white">{page}</span> : <Link key={page} className="border border-stone-300 px-4 py-2" href={`/${lang}/category/${slug}?page=${page}`}>{page}</Link>)}{listing.page < listing.totalPages && <Link className="ml-2 px-3 py-2 text-[#965723]" href={`/${lang}/category/${slug}?page=${listing.page + 1}`}>Ďalšia →</Link>}</nav>
    </div>
  </SiteChrome>;
}
