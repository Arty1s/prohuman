import Link from "next/link";
import { SiteChrome } from "../../../components/editorial";
import { getArticle } from "../../../../lib/backend";
import type { Locale } from "../../../../lib/contracts";

const popular = [
  "Ako umelá inteligencia mení vedecký výskum",
  "Etika v dobe algoritmov: Výzvy pre spoločnosť",
  "Klimatická kríza a zodpovednosť štátov",
  "Budúcnosť práce v ére umelej inteligencie",
  "Vzdelávanie 4.0: Kam smeruje moderná škola?",
];

const related = [
  ["AI A SPOLOČNOSŤ", "Umelá inteligencia v službách verejného dobra", "article-image--microphone"],
  ["VEDA", "AI nástroje vo vzdelávaní: Prínosy a riziká", "article-image--books"],
  ["TECHNOLÓGIE", "Etické hranice vývoja AI technológií", "article-image--conference"],
];

function SharePanel() {
  return <section className="article-panel"><h2>Zdieľať tento článok</h2><div className="mt-5 flex justify-between gap-3 text-center text-[11px]">{[["in", "LinkedIn"], ["f", "Facebook"], ["𝕏", "X (Twitter)"], ["✉", "Email"]].map(([icon, label]) => <a key={label} href="#share" aria-label={`Zdieľať cez ${label}`}><span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 text-[17px] font-semibold">{icon}</span><span className="mt-2 block">{label}</span></a>)}</div></section>;
}

function ArticleSidebar() {
  return <aside className="space-y-4 border-stone-300 lg:border-l lg:pl-4">
    <section className="article-panel"><h2>Informácie o článku</h2><dl className="mt-4 space-y-3 text-[12px]"><div><dt className="text-stone-500">Typ</dt><dd className="font-semibold">Aktuality</dd></div><div><dt className="text-stone-500">Jazyk</dt><dd className="font-semibold">Slovak</dd></div></dl></section>
    <SharePanel/>
    <section className="article-panel"><div className="flex items-center justify-between"><h2>Najčítanejšie</h2><Link className="text-[11px] text-[#965723]" href="/sk/news">Zobraziť všetky　→</Link></div><ol className="mt-5 space-y-4">{popular.map((title, i) => <li key={title} className="grid grid-cols-[18px_50px_1fr] gap-3 text-[11px]"><span className="flex h-[18px] items-center justify-center rounded bg-[#965723] text-white">{i + 1}</span><span className={`article-image ${i % 2 ? "article-image--books" : "article-image--microphone"} h-12 rounded-sm`}/><div><Link className="font-semibold leading-4" href={`/sk/article/${i + 1}`}>{title}</Link><p className="mt-2 text-[10px] text-stone-500">{20 - i}. máj 2025</p></div></li>)}</ol></section>
    <section className="article-panel"><h2>Oznamy</h2><p className="mt-4 text-[12px] leading-[1.55]">Redakcia pripravuje podcastové rozhovory k vybraným témam spoločenských a humanitných vied. Návrhy hostí môžete posielať redakcii.</p><Link className="mt-4 inline-block text-[11px] text-[#965723]" href="/sk/news">Viac informácií　→</Link></section>
    <section className="article-panel"><h2>✉　Odoberajte novinky</h2><p className="mt-3 text-[12px] leading-5">Získavajte najnovšie články a oznámenia priamo do vašej e-mailovej schránky.</p><form action="/api/newsletter" method="post" className="mt-4 flex gap-2"><label className="sr-only" htmlFor="newsletter-email">Váš e-mail</label><input id="newsletter-email" name="email" type="email" required placeholder="Váš e-mail" className="min-w-0 flex-1 border border-stone-300 bg-transparent px-3 py-2 text-[12px]"/><button className="bg-[#965723] px-4 py-2 text-[12px] text-white">Odoberať</button></form></section>
  </aside>;
}

export default async function ArticlePage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params;
  const article = await getArticle(lang as Locale, id);
  return <SiteChrome lang={lang}>
    <div className="mx-auto max-w-[1310px] px-3 pb-14 sm:px-5">
      <div className="article-progress sticky top-0 z-20 flex h-12 items-center gap-5 bg-[#fbfaf7] text-[10px]"><Link href={`/${lang}/category/bezpecnostne-vedy`}>←　Späť na články</Link><span className="hidden text-stone-500 sm:inline">PRIEBEH ČÍTANIA</span><span className="hidden h-1 flex-1 overflow-hidden rounded bg-stone-200 sm:block"><span className="block h-full w-[73%] bg-[#965723]"/></span><span className="hidden sm:inline">73%</span></div>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,2fr)_330px]">
        <article>
          <p className="mb-4 inline-block rounded-sm bg-[#965723] px-3 py-1 text-[10px] font-semibold text-white">AKTUALITY</p>
          <h1 className="max-w-[800px] font-serif text-[36px] font-semibold leading-[1.08] tracking-[-.02em] sm:text-[48px]">{article.title}</h1>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-b border-stone-300 pb-5 text-[11px] text-stone-600"><span>▣　{new Date(article.publishedAt).toLocaleDateString(lang)}</span><span>⟳　Aktualizované: {new Date(article.updatedAt ?? article.publishedAt).toLocaleDateString(lang)}</span><span>◷　{article.readingMinutes} min čítania</span><span>◉　{article.viewCount.toLocaleString(lang)} zobrazení</span></div>
          <div className="article-image article-image--microphone mt-5 h-[245px] rounded-[3px] sm:h-[315px]" role="img" aria-label="Podcastový mikrofón v štúdiu"/>
          <section className="mt-4 rounded-[5px] border border-[#eadfd3] bg-[#f8f2eb] px-5 py-4"><h2 className="font-serif text-[18px] font-semibold text-[#965723]">Abstrakt</h2><p className="mt-2 text-[14px] leading-6">{article.abstract}</p></section>
          <div className="article-copy mt-5 space-y-4 text-[14px] leading-[1.58]">
            <p>Je celý vytvorený a nahovorený umelou inteligenciou (AI) a je rozšírením časopisu Prohuman, v ktorom od roku 2009 publikujeme vedecko-odborné články. Podcast sme spustili v roku 2023 a vypočujete si v ňom nielen 3 minútové upútavky na články, ale aj podcasty experimentálne spracované AI na rôzne témy alebo celé rozhovory.</p>
            <p>Umožňujeme prezentovať okrem našich podcastov aj vaše vlastné, ktoré si vytvoríte sami, alebo využijete našu službu a podcast vám pripravíme.</p>
            <section><h2>Prohuman AI na Spotify</h2><p>Počúvajte nás na Spotify:<br/><a href="https://podcasters.spotify.com" className="text-[#965723] underline">https://podcasters.spotify.com/pod/show/prohuman/embed</a></p></section>
            <section><h2>Prohuman AI na Apple Podcasts</h2><p>Počúvajte nás na Apple Podcasts:<br/><a href="https://podcasts.apple.com" className="text-[#965723] underline">https://embed.podcasts.apple.com/us/podcast/prohuman-ai/</a></p></section>
            <section><h2>V podcastoch &quot;Prohuman AI&quot; zverejňujeme:</h2><ul><li>&quot;Trailer&quot; čiže upútavku na konkrétny dlhší príspevok.</li><li>Rozhovory s odborníkmi na aktuálne spoločenské témy.</li><li>Analýzy a komentáre k významným udalostiam.</li><li>Diskusie o etike, vede, technológiách a budúcnosti.</li><li>Špeciálne série venované vybraným oblastiam vied.</li></ul></section>
            <section><h2>O podcaste</h2><p>Podcast &quot;Prohuman AI&quot; vzniká s cieľom sprístupniť kvalitné odborné myšlienky širšiemu publiku modernou a dostupnou formou. Naše epizódy sú pripravené pomocou AI technológií s dôrazom na zrozumiteľnosť, kvalitu a hodnotu pre poslucháča.</p></section>
          </div>
        </article>
        <ArticleSidebar/>
      </div>
      <section className="mt-8 border-t border-stone-300 pt-5"><div className="flex justify-between"><h2 className="font-serif text-[18px] font-semibold">Súvisiace články</h2><Link className="text-[11px] text-[#965723]" href={`/${lang}/category/bezpecnostne-vedy`}>Zobraziť všetky　→</Link></div><div className="mt-4 grid gap-4 md:grid-cols-3">{related.map(([category, title, image]) => <Link key={title} href={`/${lang}/article/2`} className="grid grid-cols-[105px_1fr] overflow-hidden rounded border border-stone-300"><span className={`article-image ${image} min-h-20`}/><span className="p-3"><small className="text-[8px] text-[#965723]">{category}</small><strong className="mt-1 block text-[12px] leading-4">{title}</strong><small className="mt-2 block text-stone-500">12. máj 2025</small></span></Link>)}</div></section>
      <section className="mt-5 border-t border-stone-300 pt-5"><div className="flex justify-between"><h2 className="font-serif text-[18px] font-semibold">Ďalšie z Prohuman</h2><Link className="text-[11px] text-[#965723]" href={`/${lang}/category/all`}>Zobraziť všetky　→</Link></div><div className="mt-4 grid gap-4 md:grid-cols-3">{related.slice().reverse().map(([category, title, image]) => <Link key={title} href={`/${lang}/article/3`} className="grid grid-cols-[105px_1fr] overflow-hidden rounded border border-stone-300"><span className={`article-image ${image} min-h-20`}/><span className="p-3"><small className="text-[8px] text-[#965723]">{category}</small><strong className="mt-1 block text-[12px] leading-4">{title}</strong><small className="mt-2 block text-stone-500">7. máj 2025</small></span></Link>)}</div></section>
    </div>
  </SiteChrome>;
}
