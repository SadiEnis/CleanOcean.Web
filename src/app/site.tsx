import type { Metadata } from 'next';
import { content, project, type Language } from './content';
import HeaderBehavior from './header-behavior';
import Cop31 from './cop31';

export type PageKind = 'home' | 'technical' | 'contact';
export const routes = { tr: { home: '/', technical: '/teknik/', contact: '/iletisim/' }, en: { home: '/en/', technical: '/en/technical/', contact: '/en/contact/' } };

export function metadata(lang: Language, page: PageKind = 'home'): Metadata {
  const description = page === 'technical' ? content[lang].system : page === 'contact' ? content[lang].contactText : content[lang].intro;
  return {
    metadataBase: new URL('https://oceanclean.com.tr'),
    title: page === 'home' ? (lang === 'tr' ? 'CleanOceans — Daha temiz denizler için birlikte oyna' : 'CleanOceans — Play together for cleaner oceans') : `${lang === 'tr' ? (page === 'technical' ? 'Teknoloji' : 'Ekip ve iletişim') : (page === 'technical' ? 'Tech' : 'Team & contact')} — CleanOceans`,
    description,
    alternates: { canonical: routes[lang][page], languages: { tr: routes.tr[page], en: routes.en[page] } },
    openGraph: { title: 'CleanOceans', description, type: 'website', locale: lang === 'tr' ? 'tr_TR' : 'en_US', images: [{ url: '/media/rescue.webp', width: 1916, height: 1080, alt: content[lang].imageAlt }] },
    twitter: { card: 'summary_large_image', title: 'CleanOceans', description, images: ['/media/rescue.webp'] },
  };
}

function Mark() {
  return <img className="brand-logo" src="/media/cleanoceans-logo.png" alt="" width="371" height="360"/>;
}

export default function Site({ lang }: { lang: Language }) {
  const t = content[lang];
  return <>
    <Header lang={lang}/>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span className="tiny-line"/>{t.eyebrow}</p><h1 id="hero-title">{t.title[0]}<br/>{t.title[1]}<br/><em>{t.title[2]}</em></h1><p className="hero-intro">{t.intro}</p><div className="hero-buttons"><a className="button" href="#gameplay">{project.gameplayVideo ? t.videoCta : t.cta}<span>↗</span></a><a className="text-link" href="#project">{t.nav[0]} <span>↓</span></a></div><ul className="badges">{t.badges.map(s => <li key={s}>{s}</li>)}</ul></div>
        <div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="image-frame"><img src="/media/rescue.webp" alt={t.imageAlt} width="1916" height="1080" fetchPriority="high"/></div></div>
        <a className="dive" href="#project"><span>↓</span>{t.scroll}</a>
      </section>
      <Cop31 lang={lang}/>
      <section className="section problem" id="project" aria-labelledby="problem-title"><div><p className="eyebrow">{t.problemLabel}</p><h2 id="problem-title">{t.problemTitle}</h2><p>{t.problem}</p><p className="muted">{t.purpose}</p></div><aside className="manifesto"><span className="water-icon">≈</span><h3>{t.aside}</h3><p>{t.asideNote}</p><span className="manifesto-bottom">CLEANOCEANS <span>↗</span></span></aside></section>
      <section className="gameplay section" id="gameplay" aria-labelledby="gameplay-title"><div className="section-heading"><div><p className="eyebrow">{t.gameplayLabel}</p><h2 id="gameplay-title">{t.gameplayTitle}</h2></div><p>{t.gameplayIntro}</p></div>
        {project.gameplayVideo ? <video className="game-video" controls preload="metadata" poster="/media/rescue.webp" aria-label={t.videoCta}><source src={project.gameplayVideo} type="video/mp4"/>{t.videoFallback}</video> : <div className="game-gallery"><a href="/media/rescue.webp" target="_blank" rel="noreferrer" aria-label={`${t.fullscreen}: 01`}><img src="/media/rescue.webp" alt={t.imageAlt} width="1916" height="1080" loading="lazy"/><span>{t.mediaLabel} / 01 <b>↗</b></span></a><a href="/media/explore.webp" target="_blank" rel="noreferrer" aria-label={`${t.fullscreen}: 02`}><img src="/media/explore.webp" alt={lang === 'tr' ? 'Geri dönüşüm teknesinin altında denizi keşfeden dalgıç' : 'A diver exploring the sea beneath the recycling boat'} width="1401" height="789" loading="lazy"/><span>{t.mediaLabel} / 02 <b>↗</b></span></a></div>}
        <div className="steps">{t.steps.map(([n, title, description]) => <article key={n}><span className="step-number">{n}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>
      <section className="cooperation" id="cooperation" aria-labelledby="coop-title"><div className="section coop-inner"><div className="coop-copy"><p className="eyebrow">{t.coopLabel}</p><h2 id="coop-title">{t.coopTitle}</h2><p>{t.coop}</p><p className="coop-note">{t.coopNote}</p></div><div className="goals"><p className="eyebrow">{t.goalsLabel}</p><div className="goal-grid">{t.goals.map(goal => <article className="goal" key={goal.number}><div className="goal-heading"><img src={`/media/sdg-${goal.number}.png`} alt="" width="540" height="540" loading="lazy"/><div><span className="goal-kicker">{lang === 'tr' ? 'SKH' : 'SDG'} {goal.number}</span><h3>{goal.title}</h3></div></div><p className="goal-intro">{goal.description}</p><ul className="goal-details">{goal.points.map(([title, description]) => <li key={title}><h4>{title}</h4><p>{description}</p></li>)}</ul></article>)}</div></div></div></section>
      <section className="section next-pages"><div><p className="eyebrow">{t.systemLabel}</p><h2>{t.systemTitle}</h2><p>{t.system}</p><a className="text-link" href={routes[lang].technical}>{lang === 'tr' ? 'Teknolojiyi keşfet' : 'Explore the tech'} ↗</a></div><div><p className="eyebrow">{t.contactLabel}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><a className="button" href={routes[lang].contact}>{t.contact} ↗</a></div></section>
    </main>
    <Footer lang={lang}/>
  </>;
}

export function Header({ lang, page = 'home' }: { lang: Language; page?: PageKind }) {
  const t = content[lang];
  const home = routes[lang].home;
  return <><a className="skip-link" href="#main">{t.skip}</a><HeaderBehavior lang={lang}>
    <a className="brand" href={home} aria-label="CleanOceans"><Mark/><span>clean<span className="brand-light">oceans</span><span className="brand-dot">.</span></span></a>
    <nav id="main-navigation" aria-label={lang === 'tr' ? 'Ana menü' : 'Main navigation'}>
      <a href={`${home}#project`}>{t.nav[0]}</a><a href={`${home}#gameplay`}>{t.nav[1]}</a><a href={`${home}#cooperation`}>{t.nav[2]}</a>
      <a href={routes[lang].technical} aria-current={page === 'technical' ? 'page' : undefined}>{lang === 'tr' ? 'Teknoloji' : 'Tech'}</a>
      <a className="mobile-contact" href={routes[lang].contact} aria-current={page === 'contact' ? 'page' : undefined}>{t.contact} ↗</a>
    </nav>
    <div className="header-actions"><div className="languages" aria-label={lang === 'tr' ? 'Dil seçimi' : 'Language'}><a href={routes.tr[page]} hrefLang="tr" lang="tr" aria-current={lang === 'tr' ? 'page' : undefined}>TR</a><span>/</span><a href={routes.en[page]} hrefLang="en" lang="en" aria-current={lang === 'en' ? 'page' : undefined}>EN</a></div><a className="header-contact" href={routes[lang].contact} aria-current={page === 'contact' ? 'page' : undefined}>{t.contact} <span>↗</span></a></div>
  </HeaderBehavior></>;
}
export function Footer({ lang }: { lang: Language }) {
  const t = content[lang];
  return <footer className="footer"><a className="brand" href="#top"><Mark/><span>cleanoceans<span className="brand-dot">.</span></span></a><p>{t.footer}</p><a href="#top">{t.top} ↑</a></footer>;
}
export function SystemOverview({ lang }: { lang: Language }) {
  const t = content[lang];
  return <section className="section system" aria-labelledby="system-title"><div className="section-heading"><div><p className="eyebrow">{t.systemLabel}</p><h2 id="system-title">{t.systemTitle}</h2></div><p>{t.system}</p></div><figure className="dashboard"><img src="/media/dashboard.webp" alt={t.systemAlt} width="1904" height="969" loading="lazy"/><figcaption><span>{t.systemCaption}</span><span>CleanOceans / Admin</span></figcaption></figure><div className="systems">{t.systems.map(([name, description]) => <div key={name}><h3>{name}</h3><p>{description}</p></div>)}</div></section>;
}
