import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Pathway.module.css';

/**
 * SolicitorSection — shown at the bottom of every pathway page.
 * caseTypeSlug: matches the query param value used on /solicitors (e.g. 'asylum', 'skilled-worker')
 * region: 'uk' | 'eu' | 'all'
 */
export function SolicitorSection({ title = 'Find Authorised Legal Help', caseTypeSlug = '', region = 'all' }) {
  const params = new URLSearchParams();
  if (caseTypeSlug) params.set('type', caseTypeSlug);
  if (region && region !== 'all') params.set('region', region);
  const searchHref = `/solicitors${params.toString() ? `?${params.toString()}` : ''}`;

  return (
    <div className={styles.section}>
      <span className={styles.sectionLabel}>Official &amp; Regulated Only</span>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.alertBox} style={{ marginBottom: '1.5rem' }}>
        <span className={styles.alertIcon}>🛡️</span>
        <p className={styles.alertText}>
          <strong>Only use regulated advisers.</strong> In the UK, advisers must be regulated by the{' '}
          <strong>SRA (Solicitors Regulation Authority)</strong> or registered with the{' '}
          <strong>OISC (Office of the Immigration Services Commissioner)</strong>. Using unregulated
          "immigration consultants" is illegal in the UK and can seriously harm your case.
        </p>
      </div>

      {/* Primary CTA — links to in-app search page pre-filtered for this case */}
      <Link
        href={searchHref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          background: 'rgba(42,157,143,0.08)',
          border: '1px solid rgba(42,157,143,0.3)',
          borderRadius: '6px',
          padding: '1.4rem 1.6rem',
          textDecoration: 'none',
          marginBottom: '1rem',
          transition: 'background 0.2s, border-color 0.2s',
        }}
      >
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.25rem' }}>
            🔍 Search legal help for this case
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>
            Browse free charities, OISC-registered advisers, and SRA-regulated solicitors
            {caseTypeSlug ? ` pre-filtered for ${caseTypeSlug.replace('-', ' ')} cases` : ''}.
            Filter by region, cost, and language.
          </div>
        </div>
        <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>→</span>
      </Link>

      <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.6 }}>
        The search page lists only organisations that are SRA-regulated, OISC-registered,
        government-funded, or registered charities — with direct contact details, languages spoken,
        and links to official verification registers.
      </div>
    </div>
  );
}

export function TopBar({ breadcrumbs = [], isEU = false }) {
  return (
    <nav className={styles.topBar}>
      <Link href="/" className={styles.logo}>
        Safe<span>Passage</span>
      </Link>
      <div className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>›</span>
        {breadcrumbs.map((b, i) =>
          i < breadcrumbs.length - 1 ? (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link href={b.href}>{b.label}</Link>
              <span>›</span>
            </span>
          ) : (
            <span key={i} className={styles.breadcrumbCurrent}>{b.label}</span>
          )
        )}
      </div>
    </nav>
  );
}

export default function PathwayPage({
  meta,
  hero,
  facts,
  isEU = false,
  breadcrumbs,
  children,
  sidebar,
}) {
  return (
    <>
      <Head>
        <title>{meta.title} | SafePassage</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        <TopBar breadcrumbs={breadcrumbs} isEU={isEU} />

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.heroIcon}>{hero.icon}</span>
            <span className={`${styles.heroTag} ${isEU ? styles.heroTagEU : ''}`}>{hero.tag}</span>
            <h1 className={styles.heroTitle}
              dangerouslySetInnerHTML={{ __html: hero.title }}
            />
            <p className={styles.heroSub}>{hero.sub}</p>
            {facts && (
              <div className={styles.heroMeta}>
                {facts.map((f, i) => (
                  <div key={i} className={`${styles.metaPill} ${f.color ? styles[`meta${f.color}`] : ''}`}>
                    {f.label}: <strong>{f.value}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.grid}>
            <main className={styles.main}>{children}</main>
            <aside className={styles.sidebar}>{sidebar}</aside>
          </div>
        </div>
      </div>
    </>
  );
}
