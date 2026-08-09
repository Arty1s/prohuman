import Link from "next/link";
import { SiteChrome } from "../../components/editorial";

export default async function PlaceholderPage({ params }: { params: Promise<{ lang: string; path: string[] }> }) {
  const { lang, path } = await params;
  const label = path.at(-1)?.replaceAll("-", " ") ?? "stránka";
  return <SiteChrome lang={lang}><section className="mx-auto max-w-[980px] px-5 py-20 text-center"><p className="text-[10px] uppercase tracking-[.18em] text-[#965723]">ProHuman</p><h1 className="mt-4 font-serif text-4xl font-semibold capitalize">{label}</h1><p className="mx-auto mt-5 max-w-xl leading-7">Táto adresa je pripravená na pripojenie k redakčnému systému a backendovým dátam. Navigácia už používa stabilné, jazykovo členené URL.</p><Link className="mt-9 inline-block border border-stone-400 px-6 py-3" href={`/${lang}/category/bezpecnostne-vedy`}>Pozrieť ukážkovú kategóriu</Link></section></SiteChrome>;
}
