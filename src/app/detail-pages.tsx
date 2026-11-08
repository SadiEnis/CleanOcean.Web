import { content, project, type Language } from './content';
import { Header, Footer, SystemOverview, routes } from './site';

const technical = {
  tr: {
    label: 'TEKNOLOJİ', title: 'Ortak bir deneyimin\narkasındaki sistem.',
    intro: 'Oynanıştan kalıcı verilere: CleanOceans’ın oyun istemcisi, çok oyunculu bağlantısı ve yönetim altyapısı.',
    architecture: 'Birbirine bağlı, ayrı sorumluluklar.', architectureLabel: '01 / SİSTEM MİMARİSİ',
    flow: ['Unity oyun istemcisi', 'ASP.NET Core Web API', 'MySQL veri tabanı'],
    flowNote: 'Oyun istemcisi ve yönetim paneli, kalıcı verilere API üzerinden erişir. Gerçek zamanlı çok oyunculu iletişim ise Unity Lobby, Relay ve Netcode for GameObjects ile yürütülür.',
    sections: [
      ['02 / OYUN İSTEMCİSİ', 'Unity ve C#', '2D su altı ortamı; hareket, atık toplama, geri dönüşüm, canlı kurtarma ve takım arkadaşını canlandırma mekaniklerini bir araya getirir. Kayıt, giriş, lobi, envanter ve maç sonuç ekranları oyun akışını tamamlar.', ['Unity Engine', 'C#', 'WebGL · Windows · Linux']],
      ['03 / ÇOK OYUNCULU ALTYAPI', 'Aynı lobiden, aynı dünyaya.', '1–4 oyuncu Unity Lobby üzerinden bir araya gelir. Relay bağlantıyı sağlar; Netcode for GameObjects oyuncu hareketlerini ve oyun içi olayları senkronize eder. WebGL bağlantısında WSS, masaüstünde UDP kullanılır.', ['Unity Lobby', 'Unity Relay', 'Netcode for GameObjects']],
      ['04 / VERİ VE İŞ KURALLARI', 'Maç biter, ilerleme kalır.', 'ASP.NET Core Web API; hesapları, oyuncu profillerini, maç sonuçlarını, skorları ve oyun içi ekonomiyi yönetir. MySQL verileri kalıcı olarak tutar. Controller, service ve repository katmanları iletişim, iş kuralları ve veri erişimini birbirinden ayırır.', ['ASP.NET Core', 'MySQL', 'REST API']],
      ['05 / YÖNETİM VE DAĞITIM', 'Oyunun yönetim tarafı.', 'React ve TypeScript ile geliştirilen panel; oyuncuları, maçları, ekonomi hareketlerini ve oyun içi olayları takip etmeyi sağlar. Linux ve Nginx tabanlı dağıtım yapısı, API ile web arayüzünü sunacak şekilde tasarlanmıştır.', ['React · Vite · TypeScript', 'Linux · Nginx', 'Yönetim ve analitik']],
    ], back: 'Projeye dön', contact: 'Proje ekibiyle tanış',
  },
  en: {
    label: 'TECH', title: 'Behind a\nshared experience.',
    intro: 'From gameplay to persistent data: the game client, multiplayer connection and management infrastructure behind CleanOceans.',
    architecture: 'Connected systems. Clear responsibilities.', architectureLabel: '01 / SYSTEM ARCHITECTURE',
    flow: ['Unity game client', 'ASP.NET Core Web API', 'MySQL database'],
    flowNote: 'The game client and management dashboard access persistent data through the API. Real-time multiplayer communication uses Unity Lobby, Relay and Netcode for GameObjects.',
    sections: [
      ['02 / GAME CLIENT', 'Unity and C#', 'The 2D underwater environment brings together movement, waste collection, recycling, animal rescue and teammate revival. Registration, sign-in, lobby, inventory and match result screens complete the game flow.', ['Unity Engine', 'C#', 'WebGL · Windows · Linux']],
      ['03 / MULTIPLAYER', 'One lobby. One shared world.', 'Unity Lobby brings 1–4 players together. Relay provides connectivity, while Netcode for GameObjects synchronizes player movement and in-game events. WebGL uses WSS connections; desktop builds use UDP.', ['Unity Lobby', 'Unity Relay', 'Netcode for GameObjects']],
      ['04 / DATA AND BUSINESS LOGIC', 'The match ends. Progress stays.', 'The ASP.NET Core Web API manages accounts, player profiles, match results, scores and the in-game economy. MySQL stores persistent data. Controller, service and repository layers separate communication, business rules and data access.', ['ASP.NET Core', 'MySQL', 'REST API']],
      ['05 / MANAGEMENT AND DEPLOYMENT', 'Behind the scenes.', 'The React and TypeScript dashboard tracks players, matches, economy transactions and gameplay events. A Linux and Nginx deployment architecture is designed to serve the API and web interface.', ['React · Vite · TypeScript', 'Linux · Nginx', 'Management & analytics']],
    ], back: 'Back to the project', contact: 'Meet the project team',
  },
};

export function TechnicalPage({ lang }: { lang: Language }) {
  const t = technical[lang];
  return <><Header lang={lang} page="technical"/><main id="main">
    <section className="detail-hero"><div className="section"><p className="eyebrow">{t.label}</p><h1>{t.title}</h1><p>{t.intro}</p></div></section>
    <section className="section architecture"><p className="eyebrow">{t.architectureLabel}</p><h2>{t.architecture}</h2><ol className="architecture-flow">{t.flow.map((item, i) => <li key={item}><span>0{i + 1}</span><h3>{item}</h3>{i < 2 && <b aria-hidden="true">↔</b>}</li>)}</ol><p className="muted">{t.flowNote}</p></section>
    <div className="section technical-sections">{t.sections.map(([label, title, text, tags]) => <section className="technical-row" key={String(label)}><div><p className="eyebrow">{label}</p><h2>{title}</h2></div><div><p>{text}</p><ul className="technology-tags">{(tags as string[]).map(tag => <li key={tag}>{tag}</li>)}</ul></div></section>)}</div>
    <SystemOverview lang={lang}/>
    <section className="section page-links"><a className="text-link" href={routes[lang].home}>← {t.back}</a><a className="button" href={routes[lang].contact}>{t.contact} ↗</a></section>
  </main><Footer lang={lang}/></>;
}

export function ContactPage({ lang }: { lang: Language }) {
  const t = content[lang];
  const tr = lang === 'tr';
  return <><Header lang={lang} page="contact"/><main id="main">
    <section className="detail-hero"><div className="section"><p className="eyebrow">{tr ? 'EKİP VE İLETİŞİM' : 'TEAM & CONTACT'}</p><h1>{t.contactTitle}</h1><p>{t.contactText}</p><a className="button" href={`mailto:${project.email}`}>{t.emailCta} ↗</a></div></section>
    <section className="section team"><p className="eyebrow">{tr ? 'PROJENİN ARKASINDAKİ İSİMLER' : 'THE PEOPLE BEHIND THE PROJECT'}</p><h2>{tr ? 'CleanOceans proje ekibi.' : 'The CleanOceans team.'}</h2><div className="team-grid">
      <article className="team-person"><span className="person-initials" aria-hidden="true">SE</span><p className="eyebrow">{tr ? 'PROJE GELİŞTİRİCİSİ' : 'PROJECT DEVELOPER'}</p><h3>Sadi Enis Güçlüer</h3><p>{tr ? 'CleanOceans’ın oyun istemcisi, backend, veri tabanı ve yönetim panelinin geliştirilmesi.' : 'Development of the CleanOceans game client, backend, database and management dashboard.'}</p><a href={`mailto:${project.email}`}>{project.email} ↗</a><a href={project.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></article>
      <article className="team-person"><span className="person-initials" aria-hidden="true">NA</span><p className="eyebrow">{tr ? 'PROJE DANIŞMANI' : 'PROJECT ADVISOR'}</p><h3>{tr ? 'Doç. Dr. Nuh Azgınoğlu' : 'Assoc. Prof. Dr. Nuh Azgınoğlu'}</h3><p>{tr ? 'Bilgisayar mühendisliği bitirme projesinin akademik danışmanlığı.' : 'Academic supervision of the computer engineering graduation project.'}</p></article>
    </div></section>
    <section className="section contact-invitation"><p className="eyebrow">{t.contactLabel}</p><h2>{tr ? 'Birlikte konuşalım.' : 'Let’s start a conversation.'}</h2><p>{tr ? 'Eğitimde kullanım, proje sunumu veya olası işbirlikleri hakkında Sadi Enis Güçlüer ile e-posta üzerinden iletişime geçebilirsin.' : 'Contact Sadi Enis Güçlüer by email to discuss educational use, project presentations or potential collaborations.'}</p><a className="button" href={`mailto:${project.email}`}>{t.emailCta} ↗</a></section>
  </main><Footer lang={lang}/></>;
}
