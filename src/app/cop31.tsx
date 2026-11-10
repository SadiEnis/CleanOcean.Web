import type { Language } from './content';

const copy = {
  tr: {
    label: 'COP31 / PROJE GÖSTERİMİ',
    title: 'CleanOceans, COP31’de.',
    description: 'Denizleri korumayı ve birlikte hareket etmeyi odağına alan projemiz, COP31 kapsamında ortak ekran alanında sergilenecek.',
    dateLabel: 'TARİH', date: '16 Kasım 2026', timeLabel: 'SAAT', screenLabel: 'EKRAN',
    timezone: 'Türkiye saati · UTC+3',
  },
  en: {
    label: 'COP31 / PROJECT SHOWCASE',
    title: 'CleanOceans at COP31.',
    description: 'Our project brings ocean protection and cooperation into play. CleanOceans will be showcased in the shared screen area at COP31.',
    dateLabel: 'DATE', date: '16 November 2026', timeLabel: 'TIME', screenLabel: 'SCREEN',
    timezone: 'Türkiye time · UTC+3',
  },
};

export default function Cop31({ lang }: { lang: Language }) {
  const t = copy[lang];
  return <section className="cop31" id="cop31" aria-labelledby="cop31-title">
    <div className="section cop31-inner">
      <div className="cop31-logo"><img src="/media/cop31-logo.png" alt="COP31 Türkiye Antalya" width="300" height="113" loading="lazy"/></div>
      <div className="cop31-copy"><p className="eyebrow">{t.label}</p><h2 id="cop31-title">{t.title}</h2><p>{t.description}</p></div>
      <div className="cop31-schedule">
        <dl>
          <div className="cop31-date"><dt>{t.dateLabel}</dt><dd><time dateTime="2026-11-16">{t.date}</time></dd></div>
          <div><dt>{t.timeLabel}</dt><dd><time dateTime="2026-11-16T15:30:00+03:00">15.30</time></dd></div>
          <div className="cop31-screen"><dt>{t.screenLabel}</dt><dd>06</dd></div>
        </dl>
        <p>{t.timezone}</p>
      </div>
    </div>
  </section>;
}
