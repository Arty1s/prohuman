import type { Metadata } from "next";
import Link from "next/link";
import { Icon, SiteChrome } from "./components/editorial";

export const metadata: Metadata = {
  title: "ProHuman — Veda, ľudskosť, spoločnosť",
  description: "Odborný portál pre spoločenské a humanitné vedy.",
};

const articles = [
  {
    image: "article-image--microphone",
    title: 'Podcast vytvorený umelou inteligenciou "Prohuman AI" dostupný na Spotify aj Apple Podcasts',
    description: 'Spustili sme podcast "Prohuman AI", v ktorom prinášame odborné rozhovory k vybraným témam spoločenských a humanitných vied.',
    date: "21 FEB 2025",
    views: "33 903",
    featured: true,
  },
  {
    image: "article-image--books",
    title: "Január mesiac recenzií kníh",
    description: "Prinášame výber najzaujímavejších knižných noviniek a odborných publikácií z rôznych oblastí.",
    date: "29 DEC 2023",
    views: "26 590",
  },
  {
    image: "article-image--conference",
    title: "Máte zborníky príspevkov z konferencií a chcete ich sprístupniť širšej verejnosti?",
    description: "ProHuman ponúka priestor pre publikovanie zborníkov z odborných podujatí v otvorenom prístupe.",
    date: "12 DEC 2023",
    views: "18 112",
  },
];

function Article({ article }: { article: typeof articles[number] }) {
  return <article className={`grid gap-5 border-b border-stone-300 py-5 sm:grid-cols-[44%_1fr] sm:gap-8 ${article.featured ? "pt-6" : ""}`}>
    <div role="img" aria-label="" className={`article-image ${article.image} min-h-[190px] w-full ${article.featured ? "sm:min-h-[282px]" : "sm:min-h-[165px]"}`} />
    <div className="flex min-w-0 flex-col py-0.5">
      {article.featured !== undefined && <p className="mb-4 text-[10px] font-semibold text-[#965723]">AKTUALITY</p>}
      <h2 className={`font-serif font-semibold leading-[1.08] tracking-[-.02em] ${article.featured ? "text-[31px] lg:text-[36px]" : "text-[25px] lg:text-[28px]"}`}><Link href="/sk/article/1">{article.title}</Link></h2>
      <p className="mt-4 max-w-[600px] text-[14px] leading-[1.55]">{article.description}</p>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 text-[10px]"><span>OD REDAKCIE</span><span>·</span><span>{article.date}</span><span>·</span><span className="flex items-center gap-1"><Icon name="eye" /> {article.views}</span></div>
    </div>
  </article>;
}

function Sidebar() {
  const news = [
    ["Súťaž o najlepší odborný článok 2025", "Zapojte sa do našej súťaže a vyhrajte zaujímavé ceny.", "21. 05. 2025"],
    ["Podpora otvorenej vedy pokračuje", "Pripravujeme nové nástroje pre autorov a výskumníkov.", "15. 05. 2025"],
    ["ProHuman AI – nový podcast", "Nové epizódy nášho podcastu každý mesiac na Spotify a Apple Podcasts.", "08. 05. 2025"],
  ];
  return <aside className="border-stone-300 pt-6 lg:border-l lg:pl-5">
    <h2 className="mb-5 text-[15px] font-semibold tracking-wide">NAŠE SLUŽBY</h2>
    <div className="grid grid-cols-2 gap-3">
      <Link href="/sk/services/proofreading" className="min-h-[175px] border border-stone-300 p-5"><div className="mb-4 text-[35px] text-[#965723]"><Icon name="pen" /></div><h3 className="text-[13px] font-semibold leading-tight">KOREKTÚRY<br/>TEXTOV</h3><p className="mt-3 text-[13px] leading-5">Objednať<br/>korektúru</p></Link>
      <Link href="/sk/services/surveys" className="min-h-[175px] border border-stone-300 p-5"><div className="mb-4 text-[38px] text-[#965723]"><Icon name="globe" /></div><h3 className="text-[13px] font-semibold leading-tight">ONLINE<br/>DOTAZNÍKY</h3><p className="mt-3 text-[13px] leading-5">Vytvoriť<br/>dotazník</p></Link>
    </div>
    <section className="mt-6 rounded-[6px] border border-stone-300 p-5">
      <div className="mb-5 flex items-center justify-between"><h2 className="text-[14px] font-semibold tracking-wide">NOVINKY</h2><Link className="text-[12px] text-[#965723]" href="/sk/news">Zobraziť všetky　→</Link></div>
      <div className="space-y-5">{news.map(([title, body, date]) => <div key={title} className="grid grid-cols-[10px_1fr_auto] gap-x-2 text-[12px] leading-[1.45]"><span className="mt-1 text-[#a86d35]">●</span><div><h3>{title}</h3><p className="mt-1">{body}</p></div><time className="pl-2 whitespace-nowrap">{date}</time></div>)}</div>
    </section>
    <section className="mt-5 rounded-[6px] border border-stone-300 p-5"><h2 className="text-[14px] font-semibold tracking-wide">OZNAMY</h2><p className="mt-5 text-[13px] leading-[1.55]">Redakcia pripravuje podcastové rozhovory k vybraným témam spoločenských a humanitných vied. Návrhy hostí môžete posielať redakcii.</p></section>
  </aside>;
}

export default function Home() {
  return <SiteChrome><div className="mx-auto grid max-w-[1460px] gap-9 px-3 pb-10 sm:px-2 lg:grid-cols-[minmax(0,2.08fr)_minmax(330px,0.92fr)]"><section>{articles.map(a => <Article key={a.title} article={a}/>)}</section><Sidebar/></div></SiteChrome>;
}
