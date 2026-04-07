import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getTranslations } from '../lib/i18n';
import { LANGUAGES } from '../lib/languages';
import styles from '../styles/Home.module.css';

// ── PATH RECOMMENDATION LOGIC ───────────────────────────────────────────────
const PATH_MAP = {
  'Fleeing war or persecution':           ['asylum', 'resettlement', 'humanitarian'],
  'Seeking better work/economic opportunity': ['work', 'study', 'family'],
  'Family already in Europe':             ['family', 'humanitarian', 'asylum'],
  'Studying abroad':                      ['study', 'work', 'family'],
  'Unsure / other':                       ['asylum', 'humanitarian', 'resettlement'],
  // AR
  'الفرار من الحرب أو الاضطهاد':         ['asylum', 'resettlement', 'humanitarian'],
  'البحث عن فرصة عمل اقتصادية':          ['work', 'study', 'family'],
  'عائلة موجودة في أوروبا':              ['family', 'humanitarian', 'asylum'],
  'الدراسة في الخارج':                    ['study', 'work', 'family'],
  'غير متأكد / أخرى':                    ['asylum', 'humanitarian', 'resettlement'],
  // FR
  'Fuir la guerre ou la persécution':     ['asylum', 'resettlement', 'humanitarian'],
  "Chercher une opportunité économique":  ['work', 'study', 'family'],
  "Famille déjà en Europe":              ['family', 'humanitarian', 'asylum'],
  "Étudier à l'étranger":               ['study', 'work', 'family'],
  "Incertain / Autre":                   ['asylum', 'humanitarian', 'resettlement'],
  // TR
  'Savaş veya zulümden kaçış':           ['asylum', 'resettlement', 'humanitarian'],
  'Daha iyi iş/ekonomik fırsat arayışı': ['work', 'study', 'family'],
  "Avrupa'da zaten aile var":            ['family', 'humanitarian', 'asylum'],
  'Yurt dışında eğitim':                 ['study', 'work', 'family'],
  'Emin değilim / Diğer':               ['asylum', 'humanitarian', 'resettlement'],
};

// ── COMPONENT: Language bar ──────────────────────────────────────────────────
function LangBar({ t, currentLocale }) {
  const router = useRouter();
  return (
    <div className={styles.langBar}>
      <span>{t.langBar}</span>
      {LANGUAGES.map(lang => (
        <button
          key={lang.code}
          className={`${styles.langBtn} ${currentLocale === lang.code ? styles.langBtnActive : ''}`}
          onClick={() => router.push('/', '/', { locale: lang.code })}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

// ── COMPONENT: Nav ───────────────────────────────────────────────────────────
function Nav({ t }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.navLogo}>Safe<span>Passage</span></div>
      <ul className={styles.navLinks}>
        {['dangers','routes','legal','compare','stories'].map(k => (
          <li key={k}><a href={`#${k}`}>{t.nav[k]}</a></li>
        ))}
      </ul>
      <a href="#legal" className={`btn btn-safe ${styles.navCta}`}>{t.nav.findHelp}</a>
      <button className={styles.navBurger} onClick={() => setOpen(o => !o)} aria-label="menu">
        <span/><span/><span/>
      </button>
      {open && (
        <div className={styles.navMobile}>
          {['dangers','routes','legal','compare','stories'].map(k => (
            <a key={k} href={`#${k}`} onClick={() => setOpen(false)}>{t.nav[k]}</a>
          ))}
          <a href="#legal" className={styles.navMobileCta} onClick={() => setOpen(false)}>{t.nav.findHelp}</a>
        </div>
      )}
    </nav>
  );
}

// ── COMPONENT: Hero ──────────────────────────────────────────────────────────
function Hero({ t }) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroGrain}/>
      <div className={styles.heroBg}/>
      <div className={styles.heroContent}>
        <div className={styles.heroTag}><span className={styles.pulse}/>{t.hero.tag}</div>
        <h1 className={styles.heroH1}>
          {t.hero.headline1}<br/>
          <em>{t.hero.headline2}</em><br/>
          {t.hero.headline3}
        </h1>
        <p className={styles.heroSub}>{t.hero.sub}</p>
        <div className={styles.heroCta}>
          <a href="#dangers" className="btn btn-danger">{t.hero.cta1}</a>
          <a href="#legal" className="btn btn-outline">{t.hero.cta2}</a>
        </div>
      </div>
      <div className={styles.waveWrap}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="rgba(15,52,96,0.4)" d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"/>
        </svg>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{marginTop:'-60px',opacity:0.5}}>
          <path fill="rgba(230,57,70,0.07)" d="M0,20 C360,60 1080,0 1440,30 L1440,80 L0,80 Z"/>
        </svg>
      </div>
    </section>
  );
}

// ── COMPONENT: Strip ─────────────────────────────────────────────────────────
function Strip({ t }) {
  return (
    <div className={styles.strip}>
      <p>{t.strip.text} <strong>{t.strip.number}</strong> {t.strip.text2}</p>
    </div>
  );
}

// ── COMPONENT: Stats ─────────────────────────────────────────────────────────
function DangerStats({ t }) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  const accents = ['danger','warning','ocean','ocean'];
  return (
    <section id="dangers" className={styles.section} ref={ref}>
      <div className="container">
        <span className="section-label">{t.dangers.label}</span>
        <h2 className="display">{t.dangers.title1} <em>{t.dangers.title2}</em></h2>
        <p className="lead-text">{t.dangers.lead}</p>
        <div className={styles.statsGrid}>
          {t.dangers.stats.map((s, i) => (
            <div key={i} className={`${styles.statCard} ${styles[accents[i]]} reveal`} style={{transitionDelay:`${i*0.1}s`}}>
              <div className={styles.statNumber}>{s.number}</div>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statSource}>{s.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── COMPONENT: Routes ────────────────────────────────────────────────────────
function Routes({ t }) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section id="routes" className={styles.section} ref={ref}>
      <div className="container">
        <span className="section-label">{t.routes.label}</span>
        <h2 className="display">{t.routes.title1} <em>{t.routes.title2}</em></h2>
        <p className="lead-text">{t.routes.lead}</p>
        <div className={styles.routesGrid}>
          {t.routes.items.map((r, i) => (
            <div key={i} className={`${styles.routeCard} reveal`} style={{transitionDelay:`${i*0.08}s`}}>
              <div className={styles.routeIcon}>{r.icon}</div>
              <h3 className={styles.routeName}>{r.name}</h3>
              <div className={styles.routeBadge}>{r.badge}</div>
              <p className={styles.routeDesc}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── COMPONENT: Legal Pathway Finder (Strategic) ───────────────────────────────
function LegalPaths({ t }) {
  const [q1, setQ1] = useState(null);
  const [q2, setQ2] = useState(null);
  const [shown, setShown] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleShow = () => {
    const ids = q1 ? (PATH_MAP[q1] || ['asylum','resettlement','humanitarian']) : t.legal.paths.map(p=>p.id);
    setRecommended(ids);
    setShown(true);
    setTimeout(() => {
      document.getElementById('legalResults')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const orderedPaths = shown
    ? [
        ...t.legal.paths.filter(p => recommended.includes(p.id)),
        ...t.legal.paths.filter(p => !recommended.includes(p.id)),
      ]
    : t.legal.paths;

  return (
    <section id="legal" className={styles.legalSection} ref={ref}>
      {/* ── Finder widget ── */}
      <div className={`${styles.finderWrap} container`}>
        <div className={styles.finderBox + ' reveal'}>
          <div className={styles.finderHeader}>
            <span className="section-label">{t.legal.label}</span>
            <h2 className={`display ${styles.safeTitle}`}>{t.legal.title1} <span className="safe">{t.legal.title2}</span></h2>
            <p className={styles.finderLead}>{t.legal.lead}</p>
          </div>

          <div className={styles.finderQuestions}>
            <div className={styles.finderQ}>
              <p className={styles.finderQLabel}>① {t.legal.q1}</p>
              <div className={styles.finderOpts}>
                {t.legal.q1opts.map(o => (
                  <button
                    key={o}
                    className={`${styles.opt} ${q1 === o ? styles.optActive : ''}`}
                    onClick={() => setQ1(o)}
                  >{o}</button>
                ))}
              </div>
            </div>

            <div className={styles.finderQ}>
              <p className={styles.finderQLabel}>② {t.legal.q2}</p>
              <div className={styles.finderOpts}>
                {t.legal.q2opts.map(o => (
                  <button
                    key={o}
                    className={`${styles.opt} ${q2 === o ? styles.optActive : ''}`}
                    onClick={() => setQ2(o)}
                  >{o}</button>
                ))}
              </div>
            </div>

            <button className={`btn btn-safe ${styles.finderBtn}`} onClick={handleShow}>
              {t.legal.showBtn}
            </button>
          </div>
        </div>
      </div>

      {/* ── Path cards ── */}
      <div id="legalResults" className={`${styles.pathsWrap} container`}>
        <h3 className={styles.pathsSubtitle}>{shown ? '' : t.legal.allTitle}</h3>
        <div className={styles.pathsGrid}>
          {orderedPaths.map((p, i) => {
            const isRec = shown && recommended.includes(p.id);
            return (
              <div
                key={p.id}
                className={`${styles.pathCard} ${isRec ? styles.pathCardRec : ''} reveal`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                {isRec && <div className={styles.recBadge}>✓ Recommended for you</div>}
                <div className={styles.pathIcon}>{p.icon}</div>
                <div className={styles.pathTag}>{p.tag}</div>
                <h3 className={styles.pathName}>{p.name}</h3>
                <p className={styles.pathDesc}>{p.desc}</p>

                <div className={styles.pathHow}>
                  <strong>How to apply:</strong> {p.how}
                </div>

                <div className={styles.pathMeta}>
                  <span className={styles.pathMetaItem}><em>Cost:</em> {p.cost}</span>
                  <span className={styles.pathMetaItem}><em>Time:</em> {p.time}</span>
                  <span className={`${styles.pathMetaItem} ${styles.riskLow}`}><em>Risk:</em> {p.risk}</span>
                </div>

                <div className={styles.pathLinks}>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.pathLink}>{p.linkLabel}</a>
                  {p.link2 && <a href={p.link2} target="_blank" rel="noopener noreferrer" className={styles.pathLink}>{p.linkLabel2}</a>}
                </div>
                <div className={styles.pathLinks} style={{ marginTop: '0.6rem', gap: '0.5rem' }}>
                  {p.id === 'asylum' && <><Link href="/pathways/uk/asylum" className={styles.pathLink} style={{ background: 'rgba(42,157,143,0.08)', borderColor: 'rgba(42,157,143,0.2)', padding: '0.3rem 0.7rem', borderRadius: '3px', border: '1px solid', fontSize: '0.74rem' }}>🇬🇧 Full UK Guide →</Link><Link href="/pathways/eu/asylum" className={styles.pathLink} style={{ background: 'rgba(74,158,255,0.08)', borderColor: 'rgba(74,158,255,0.2)', padding: '0.3rem 0.7rem', borderRadius: '3px', border: '1px solid', fontSize: '0.74rem', color: '#4a9eff' }}>🇪🇺 Full EU Guide →</Link></>}
                  {p.id === 'resettlement' && <><Link href="/pathways/uk/resettlement" className={styles.pathLink} style={{ background: 'rgba(42,157,143,0.08)', borderColor: 'rgba(42,157,143,0.2)', padding: '0.3rem 0.7rem', borderRadius: '3px', border: '1px solid', fontSize: '0.74rem' }}>🇬🇧 UK Schemes →</Link><Link href="/pathways/eu/resettlement" className={styles.pathLink} style={{ background: 'rgba(74,158,255,0.08)', borderColor: 'rgba(74,158,255,0.2)', padding: '0.3rem 0.7rem', borderRadius: '3px', border: '1px solid', fontSize: '0.74rem', color: '#4a9eff' }}>🇪🇺 EU Schemes →</Link></>}
                  {p.id === 'work' && <><Link href="/pathways/uk/skilled-worker" className={styles.pathLink} style={{ background: 'rgba(42,157,143,0.08)', borderColor: 'rgba(42,157,143,0.2)', padding: '0.3rem 0.7rem', borderRadius: '3px', border: '1px solid', fontSize: '0.74rem' }}>🇬🇧 UK Guide →</Link><Link href="/pathways/eu/blue-card" className={styles.pathLink} style={{ background: 'rgba(74,158,255,0.08)', borderColor: 'rgba(74,158,255,0.2)', padding: '0.3rem 0.7rem', borderRadius: '3px', border: '1px solid', fontSize: '0.74rem', color: '#4a9eff' }}>🇪🇺 EU Blue Card →</Link></>}
                  {p.id === 'study' && <><Link href="/pathways/uk/student" className={styles.pathLink} style={{ background: 'rgba(42,157,143,0.08)', borderColor: 'rgba(42,157,143,0.2)', padding: '0.3rem 0.7rem', borderRadius: '3px', border: '1px solid', fontSize: '0.74rem' }}>🇬🇧 UK Guide →</Link><Link href="/pathways/eu/student" className={styles.pathLink} style={{ background: 'rgba(74,158,255,0.08)', borderColor: 'rgba(74,158,255,0.2)', padding: '0.3rem 0.7rem', borderRadius: '3px', border: '1px solid', fontSize: '0.74rem', color: '#4a9eff' }}>🇪🇺 EU Guide →</Link></>}
                  {p.id === 'family' && <><Link href="/pathways/uk/family" className={styles.pathLink} style={{ background: 'rgba(42,157,143,0.08)', borderColor: 'rgba(42,157,143,0.2)', padding: '0.3rem 0.7rem', borderRadius: '3px', border: '1px solid', fontSize: '0.74rem' }}>🇬🇧 UK Guide →</Link><Link href="/pathways/eu/family" className={styles.pathLink} style={{ background: 'rgba(74,158,255,0.08)', borderColor: 'rgba(74,158,255,0.2)', padding: '0.3rem 0.7rem', borderRadius: '3px', border: '1px solid', fontSize: '0.74rem', color: '#4a9eff' }}>🇪🇺 EU Guide →</Link></>}
                  {p.id === 'humanitarian' && <><Link href="/pathways/eu/humanitarian" className={styles.pathLink} style={{ background: 'rgba(74,158,255,0.08)', borderColor: 'rgba(74,158,255,0.2)', padding: '0.3rem 0.7rem', borderRadius: '3px', border: '1px solid', fontSize: '0.74rem', color: '#4a9eff' }}>🇪🇺 Full EU Guide →</Link></>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── COMPONENT: Compare ───────────────────────────────────────────────────────
function Compare({ t }) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section id="compare" className={styles.section} ref={ref}>
      <div className="container">
        <span className="section-label">{t.compare.label}</span>
        <h2 className="display">
          <em>{t.compare.title1}</em> {t.compare.title2}
          <span className={styles.compareSub}>{t.compare.subtitle}</span>
        </h2>
        <div className={`${styles.compareWrap} reveal`}>
          <table className={styles.compareTable}>
            <thead>
              <tr>
                <th></th>
                <th className={styles.thIllegal}>{t.compare.colIllegal}</th>
                <th className={styles.thLegal}>{t.compare.colLegal}</th>
              </tr>
            </thead>
            <tbody>
              {t.compare.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? styles.trEven : ''}>
                  <td className={styles.tdFactor}>{row.factor}</td>
                  <td className={styles.tdIllegal}>{row.illegal}</td>
                  <td className={styles.tdLegal}>{row.legal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ── COMPONENT: Stories ───────────────────────────────────────────────────────
function Stories({ t }) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section id="stories" className={styles.section} ref={ref}>
      <div className="container">
        <span className="section-label">{t.stories.label}</span>
        <h2 className="display">{t.stories.title1} <em>{t.stories.title2}</em></h2>
        <div className={styles.storiesGrid}>
          {t.stories.items.map((s, i) => (
            <div key={i} className={`${styles.storyCard} ${s.type === 'safe' ? styles.storyCardSafe : styles.storyCardDanger} reveal`} style={{transitionDelay:`${i*0.12}s`}}>
              <div className={styles.storyFlag}>{s.flag}</div>
              <blockquote className={styles.storyQuote}>"{s.quote}"</blockquote>
              <cite className={styles.storyName}>{s.name}</cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── COMPONENT: CTA ───────────────────────────────────────────────────────────
function Cta({ t }) {
  return (
    <div className={styles.ctaSection}>
      <div className="container" style={{textAlign:'center'}}>
        <span className="section-label" style={{color:'rgba(255,255,255,0.35)'}}>{t.cta.label}</span>
        <h2 className={`display ${styles.ctaTitle}`}>{t.cta.title}</h2>
        <p className={styles.ctaSub}>{t.cta.sub}</p>
        <div className={styles.ctaBtns}>
          <a href="https://www.unhcr.org/get-help" target="_blank" rel="noopener" className="btn btn-safe">{t.cta.btn1}</a>
          <a href="https://ec.europa.eu/immigration" target="_blank" rel="noopener" className="btn btn-outline">{t.cta.btn2}</a>
          <a href="https://www.gov.uk/browse/visas-immigration" target="_blank" rel="noopener" className="btn btn-outline">{t.cta.btn3}</a>
        </div>
      </div>
    </div>
  );
}

// ── COMPONENT: Live Counter ──────────────────────────────────────────────────
function LiveCounter({ t }) {
  const [count, setCount] = useState(null);
  const [live, setLive] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  useEffect(() => {
    fetch('/api/iom-counter')
      .then(r => r.json())
      .then(data => {
        setCount(data.count);
        setLive(data.live);
        setYear(data.year);
      })
      .catch(() => {
        const day = Math.floor((Date.now() - new Date(`${new Date().getFullYear()}-01-01`)) / 86400000);
        setCount(Math.round(day * 8.5));
      });
  }, []);

  // Slow tick — approx 1 death / 5 hrs = ~0.2/hr = ~0.003/min
  useEffect(() => {
    if (!count) return;
    const id = setInterval(() => {
      if (Math.random() < 0.04) setCount(c => c + 1);
    }, 60000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className={styles.liveCounter}>
      <div className={styles.lcLabel}>
        <span className={`${styles.pulse} ${live ? styles.pulseLive : styles.pulseFallback}`}/>
        {t.counter.label} {year}
      </div>
      <div className={styles.lcNumber}>
        {count !== null ? count.toLocaleString() : '…'}
      </div>
      <div className={styles.lcSub}>{t.counter.sub}</div>
      <div className={styles.lcDate}>as of {today}</div>
      <div className={styles.lcSource}>{t.counter.source}</div>
      {!live && count !== null && <div className={styles.lcEst}>estimated</div>}
    </div>
  );
}

// ── COMPONENT: Think Carefully ──────────────────────────────────────────────
function ThinkCarefully({ t }) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section id="think" className={styles.section} ref={ref}>
      <div className="container">
        <span className="section-label">{t.thinkCarefully.label}</span>
        <h2 className="display">{t.thinkCarefully.title1} <em>{t.thinkCarefully.title2}</em></h2>
        <p className="lead-text">{t.thinkCarefully.lead}</p>
        <div className={styles.thinkGrid}>
          {t.thinkCarefully.cards.map((card, i) => (
            <div key={i} className={`${styles.thinkCard} reveal`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={styles.thinkIcon}>{card.icon}</div>
              <h3 className={styles.thinkTitle}>{card.title}</h3>
              <p className={styles.thinkBody}>{card.body}</p>
            </div>
          ))}
        </div>
        <div className={styles.thinkWarning}>
          <span className={styles.thinkWarnIcon}>⚠️</span>
          <p>{t.thinkCarefully.warning}</p>
        </div>
      </div>
    </section>
  );
}

// ── COMPONENT: Crude Reality ─────────────────────────────────────────────────
function CrudeReality({ t }) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section id="reality" className={styles.section} ref={ref}>
      <div className="container">
        <span className="section-label">{t.crudeReality.label}</span>
        <h2 className="display">{t.crudeReality.title1} <em>{t.crudeReality.title2}</em></h2>
        <p className="lead-text">{t.crudeReality.lead}</p>
        <div className={styles.realityGrid}>
          {t.crudeReality.items.map((item, i) => (
            <div key={i} className={`${styles.realityCard} reveal`} style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className={styles.realityIcon}>{item.icon}</div>
              <h3 className={styles.realityTitle}>{item.title}</h3>
              <p className={styles.realityBody}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── COMPONENT: After Arrival ─────────────────────────────────────────────────
function AfterArrival({ t }) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section id="afterarrival" className={styles.section} ref={ref}>
      <div className="container">
        <span className="section-label">{t.afterArrival.label}</span>
        <h2 className="display">{t.afterArrival.title1} <em>{t.afterArrival.title2}</em></h2>
        <p className="lead-text">{t.afterArrival.lead}</p>
        <div className={styles.arrivalGrid}>
          {t.afterArrival.items.map((item, i) => (
            <div key={i} className={`${styles.arrivalCard} reveal`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={styles.arrivalFlag}>{item.flag}</div>
              <h3 className={styles.arrivalTitle}>{item.title}</h3>
              <p className={styles.arrivalBody}>{item.body}</p>
              <div className={styles.arrivalSource}>{item.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── COMPONENT: Come Home ─────────────────────────────────────────────────────
function ComeHome({ t }) {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.08 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section id="comehome" className={styles.section + ' ' + styles.comeHomeSection} ref={ref}>
      <div className="container">
        <span className="section-label">{t.comeHome.label}</span>
        <h2 className={`display ${styles.comeHomeTitle}`}>{t.comeHome.title}</h2>
        <p className={`lead-text ${styles.comeHomeSub}`}>{t.comeHome.sub}</p>
        <div className={styles.comeHomeGrid}>
          {t.comeHome.points.map((point, i) => (
            <div key={i} className={`${styles.comeHomeCard} reveal`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <span className={styles.comeHomeIcon}>{point.icon}</span>
              <p className={styles.comeHomeText}>{point.text}</p>
            </div>
          ))}
        </div>
        <div className={styles.comeHomeCta}>{t.comeHome.cta}</div>
      </div>
    </section>
  );
}

// ── COMPONENT: Footer ────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLogo}>Safe<span>Passage</span></div>
      <p className={styles.footerText}>{t.footer.disclaimer}</p>
      <p className={styles.footerSources}>{t.footer.sources}</p>
    </footer>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function Home({ t, locale }) {
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description}/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta property="og:title" content={t.meta.title}/>
        <meta property="og:description" content={t.meta.description}/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <div dir={dir}>
        <LangBar t={t} currentLocale={locale}/>
        <Nav t={t}/>
        <Hero t={t}/>
        <Strip t={t}/>
        <DangerStats t={t}/>
        <div className="divider"/>
        <Routes t={t}/>
        <div className="divider"/>
        <LegalPaths t={t}/>
        <div className="divider"/>
        <Compare t={t}/>
        <div className="divider"/>
        <ThinkCarefully t={t}/>
        <div className="divider"/>
        <CrudeReality t={t}/>
        <div className="divider"/>
        <AfterArrival t={t}/>
        <div className="divider"/>
        <ComeHome t={t}/>
        <div className="divider"/>
        <Stories t={t}/>
        <Cta t={t}/>
        <Footer t={t}/>
        <LiveCounter t={t}/>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const t = getTranslations(locale);
  return { props: { t, locale } };
}
