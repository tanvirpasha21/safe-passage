import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SOLICITORS, CASE_TYPES, REGIONS, COST_FILTERS, filterSolicitors } from '../../lib/solicitors';
import styles from '../../styles/Solicitors.module.css';
import { getPageTranslations } from '../../lib/i18n';

/* ── Context descriptions shown when arriving from a pathway page ── */
const CONTEXT_INFO = {
  asylum: {
    icon: '🏛️',
    label: 'Asylum & Protection',
    message: 'You are looking for legal help with an asylum or protection claim. Showing advisers who specialise in asylum law, appeals, and refugee status.',
    backHref: '/pathways/uk/asylum',
    backLabel: 'Back to Asylum Guide',
  },
  resettlement: {
    icon: '✈️',
    label: 'Resettlement',
    message: 'You are looking for help with UNHCR resettlement or a UK/EU resettlement scheme. Showing organisations that assist with resettlement applications.',
    backHref: '/pathways/uk/resettlement',
    backLabel: 'Back to Resettlement Guide',
  },
  'skilled-worker': {
    icon: '💼',
    label: 'Skilled Worker / Work Visa',
    message: 'You are looking for legal help with a work visa. Showing regulated solicitors and advisers who specialise in employment-based immigration.',
    backHref: '/pathways/uk/skilled-worker',
    backLabel: 'Back to Skilled Worker Guide',
  },
  student: {
    icon: '🎓',
    label: 'Student Visa',
    message: 'You are looking for legal help with a student visa application. Showing regulated advisers who handle student immigration matters.',
    backHref: '/pathways/uk/student',
    backLabel: 'Back to Student Visa Guide',
  },
  family: {
    icon: '👨‍👩‍👧',
    label: 'Family Visa / Reunification',
    message: 'You are looking for legal help with a family visa or family reunification. Showing regulated solicitors and advisers who specialise in family immigration.',
    backHref: '/pathways/uk/family',
    backLabel: 'Back to Family Visa Guide',
  },
  humanitarian: {
    icon: '🤝',
    label: 'Humanitarian Visa',
    message: 'You are looking for help with a humanitarian visa application. Showing organisations that assist with humanitarian protection cases.',
    backHref: '/pathways/eu/humanitarian',
    backLabel: 'Back to Humanitarian Visa Guide',
  },
};

const VERIFIED_BADGE_MAP = {
  SRA: { label: 'SRA Regulated', cls: styles.badgeSRA },
  OISC: { label: 'OISC Registered', cls: styles.badgeOISC },
  Charity: { label: 'Registered Charity', cls: styles.badgeCharity },
  Gov: { label: 'Government-funded', cls: styles.badgeGov },
  UNHCR: { label: 'UNHCR', cls: styles.badgeUNHCR },
  EU: { label: 'EU Official', cls: styles.badgeUNHCR },
};

function SolicitorCard({ s }) {
  const isSearch = s.type === 'search-tool';
  const verBadge = VERIFIED_BADGE_MAP[s.verified];

  return (
    <div className={`${styles.card} ${isSearch ? styles.cardSearch : ''}`}>
      <div className={styles.cardTop}>
        <div style={{ flex: 1 }}>
          <div className={styles.cardBadges}>
            {s.type === 'free' && <span className={`${styles.badge} ${styles.badgeFree}`}>Free</span>}
            {isSearch && <span className={`${styles.badge} ${styles.badgeSearch}`}>Find a solicitor</span>}
            {verBadge && <span className={`${styles.badge} ${verBadge.cls}`}>{verBadge.label}</span>}
            {s.helpline && <span className={`${styles.badge} ${styles.badgeHelpline}`}>📞 Helpline</span>}
          </div>
        </div>
      </div>

      <div className={styles.cardName}>{s.name}</div>
      <div className={styles.cardRegulation}>{s.regulation}</div>
      <p className={styles.cardDesc}>{s.desc}</p>

      {s.languages?.length > 0 && (
        <div className={styles.cardLanguages}>
          <span style={{ fontSize: '0.72rem', color: 'var(--muted)', marginRight: '0.4rem' }}>Languages:</span>
          {s.languages.map(l => (
            <span key={l} className={styles.langChip}>{l}</span>
          ))}
        </div>
      )}

      <div className={styles.cardMeta}>
        {s.phone && (
          <span className={styles.cardMetaItem}>
            📞 <a href={`tel:${s.phone.replace(/\s/g, '')}`}>{s.phone}</a>
          </span>
        )}
        {s.email && (
          <span className={styles.cardMetaItem}>
            ✉️ <a href={`mailto:${s.email}`}>{s.email}</a>
          </span>
        )}
      </div>

      <div className={styles.cardActions}>
        <a
          href={s.website}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.btnVisit} ${isSearch ? styles.btnVisitBlue : ''}`}
        >
          {isSearch ? 'Search the register →' : 'Visit website →'}
        </a>
        {s.phone && (
          <a href={`tel:${s.phone.replace(/\s/g, '')}`} className={styles.btnPhone}>
            📞 Call
          </a>
        )}
      </div>
    </div>
  );
}

export default function SolicitorSearch({ pt }) {
  const router = useRouter();

  const [caseType, setCaseType] = useState('all');
  const [region, setRegion] = useState('all');
  const [cost, setCost] = useState('all');
  const [mounted, setMounted] = useState(false);

  // Read query params on mount
  useEffect(() => {
    setMounted(true);
    if (router.query.type) setCaseType(router.query.type);
    if (router.query.region) setRegion(router.query.region);
    if (router.query.cost) setCost(router.query.cost);
  }, [router.query]);

  // Update URL when filters change
  function updateFilter(key, value) {
    const updates = { type: caseType, region, cost, [key]: value };
    // remove 'all' values from URL
    const query = Object.fromEntries(Object.entries(updates).filter(([, v]) => v !== 'all'));
    router.replace({ pathname: '/solicitors', query }, undefined, { shallow: true });
    if (key === 'type') setCaseType(value);
    if (key === 'region') setRegion(value);
    if (key === 'cost') setCost(value);
  }

  function resetFilters() {
    setCaseType('all'); setRegion('all'); setCost('all');
    router.replace({ pathname: '/solicitors' }, undefined, { shallow: true });
  }

  const filtered = filterSolicitors({ caseType, region, cost });
  const freeResults = filtered.filter(s => s.type === 'free');
  const searchResults = filtered.filter(s => s.type === 'search-tool');

  const ctx = caseType !== 'all' ? CONTEXT_INFO[caseType] : null;

  // Count per case type for filter badges
  function countForCase(ct) {
    return filterSolicitors({ caseType: ct, region, cost }).length;
  }

  return (
    <>
      <Head>
        <title>{pt.meta.title} | SafePassage</title>
        <meta name="description" content={pt.meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        {/* Top bar */}
        <nav className={styles.topBar}>
          <Link href="/" className={styles.logo}>Safe<span>Passage</span></Link>
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>›</span>
            <span className={styles.breadActive}>Find Legal Help</span>
          </div>
        </nav>

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <span className={styles.heroTag}>🛡️ Regulated & Authorised Only</span>
            <h1 className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: pt.pageTitle }} />
            <p className={styles.heroSub}>{pt.pageSubtitle}</p>
            <div className={styles.warnBanner}>
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>⚠️</span>
              <div>
                <strong>How to verify an adviser is authorised:</strong> In the UK, check the{' '}
                <a href="https://solicitors.lawsociety.org.uk/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--warning)' }}>Law Society register</a>{' '}
                (solicitors) or the{' '}
                <a href="https://www.gov.uk/find-an-immigration-adviser" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--warning)' }}>OISC register</a>{' '}
                (immigration advisers). If they are not on either register — do not use them.
              </div>
            </div>
          </div>
        </div>

        {/* Context banner when coming from a specific pathway */}
        {mounted && ctx && (
          <div className={styles.contextBanner}>
            <div className={styles.contextCard}>
              <span className={styles.contextIcon}>{ctx.icon}</span>
              <div className={styles.contextText}>
                <strong>{ctx.label} —</strong> {ctx.message}{' '}
                <Link href={ctx.backHref} style={{ color: 'var(--safe)', textDecoration: 'none', fontWeight: 600 }}>
                  ← {ctx.backLabel}
                </Link>
              </div>
              <button className={styles.clearContext} onClick={resetFilters}>
                Show all
              </button>
            </div>
          </div>
        )}

        {/* Main body */}
        <div className={styles.body}>
          <div className={styles.layout}>

            {/* ── Filters ── */}
            <aside className={styles.filters}>
              <div className={styles.filterTitle}>Filter Results</div>

              {/* Case type */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Case type</label>
                <div className={styles.filterChips}>
                  {CASE_TYPES.map(ct => {
                    const count = countForCase(ct.value);
                    const active = caseType === ct.value;
                    return (
                      <button
                        key={ct.value}
                        className={`${styles.filterChip} ${active ? styles.filterChipActive : ''}`}
                        onClick={() => updateFilter('type', ct.value)}
                      >
                        <span>{ct.label}</span>
                        <span className={`${styles.filterCount} ${active ? styles.filterCountActive : ''}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Region */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel} htmlFor="region-select">Region</label>
                <select
                  id="region-select"
                  className={styles.filterSelect}
                  value={region}
                  onChange={e => updateFilter('region', e.target.value)}
                >
                  {REGIONS.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Cost */}
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Cost</label>
                <div className={styles.filterChips}>
                  {COST_FILTERS.map(cf => {
                    const count = filterSolicitors({ caseType, region, cost: cf.value }).length;
                    const active = cost === cf.value;
                    return (
                      <button
                        key={cf.value}
                        className={`${styles.filterChip} ${active ? styles.filterChipActive : ''}`}
                        onClick={() => updateFilter('cost', cf.value)}
                      >
                        <span>{cf.label}</span>
                        <span className={`${styles.filterCount} ${active ? styles.filterCountActive : ''}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button className={styles.resetBtn} onClick={resetFilters}>
                Reset all filters
              </button>

              {/* Info box */}
              <div className={styles.infoCard} style={{ marginTop: '1.5rem' }}>
                <div className={styles.infoCardTitle}>What the badges mean</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    ['SRA Regulated', styles.badgeSRA, 'Regulated by the Solicitors Regulation Authority — the highest standard for legal advice in England & Wales.'],
                    ['OISC Registered', styles.badgeOISC, 'Registered with the Office of the Immigration Services Commissioner — legally authorised immigration advisers.'],
                    ['Registered Charity', styles.badgeCharity, 'Official registered charity providing free legal help.'],
                    ['Government-funded', styles.badgeGov, 'Funded by the UK government or an official public body.'],
                    ['UNHCR', styles.badgeUNHCR, 'UN Refugee Agency — the global authority on refugee protection.'],
                  ].map(([label, cls, tip]) => (
                    <div key={label} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                      <span className={`${styles.badge} ${cls}`} style={{ flexShrink: 0, marginTop: '0.05rem' }}>{label}</span>
                      <span style={{ fontSize: '0.73rem', color: 'var(--muted)', lineHeight: 1.5 }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* ── Results ── */}
            <main className={styles.results}>
              <div className={styles.resultsHeader}>
                <p className={styles.resultsCount}>
                  Showing <strong>{filtered.length}</strong> authorised organisations
                  {caseType !== 'all' && <> for <strong>{CASE_TYPES.find(c => c.value === caseType)?.label}</strong></>}
                  {region !== 'all' && <> in <strong>{REGIONS.find(r => r.value === region)?.label}</strong></>}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className={styles.noResults}>
                  <span className={styles.noResultsIcon}>🔍</span>
                  <div className={styles.noResultsTitle}>No results for this combination</div>
                  <p className={styles.noResultsText}>
                    Try broadening your filters — for example, select "All regions" or "All case types".
                  </p>
                </div>
              ) : (
                <>
                  {/* Free / charity help */}
                  {freeResults.length > 0 && (
                    <div className={styles.section}>
                      <div className={styles.sectionHead}>
                        <span className={styles.sectionHeadIcon}>🆓</span>
                        <span className={styles.sectionHeadTitle}>Free &amp; Charity Legal Help</span>
                        <span className={styles.sectionHeadCount}>{freeResults.length}</span>
                      </div>
                      <div className={styles.cardGrid}>
                        {freeResults.map(s => <SolicitorCard key={s.id} s={s} />)}
                      </div>
                    </div>
                  )}

                  {/* Official search tools for paid solicitors */}
                  {searchResults.length > 0 && (
                    <div className={styles.section}>
                      <div className={styles.sectionHead}>
                        <span className={styles.sectionHeadIcon}>⚖️</span>
                        <span className={styles.sectionHeadTitle}>Find a Regulated Paid Solicitor</span>
                        <span className={`${styles.sectionHeadCount} ${styles.sectionHeadCountBlue}`}>{searchResults.length}</span>
                      </div>
                      <div
                        style={{
                          background: 'rgba(74,158,255,0.05)',
                          border: '1px solid rgba(74,158,255,0.15)',
                          borderRadius: '4px',
                          padding: '0.9rem 1.2rem',
                          fontSize: '0.83rem',
                          color: 'var(--muted)',
                          lineHeight: 1.6,
                          marginBottom: '1.2rem',
                        }}
                      >
                        Use these <strong style={{ color: 'var(--light)' }}>official government registers</strong> to
                        find a paid immigration solicitor near you. Every solicitor in these registers is legally
                        authorised. When you contact a solicitor, always ask for their{' '}
                        <strong style={{ color: 'var(--light)' }}>SRA number</strong> or{' '}
                        <strong style={{ color: 'var(--light)' }}>OISC registration number</strong> and verify it
                        on the register before paying any fees.
                      </div>
                      <div className={styles.cardGrid}>
                        {searchResults.map(s => <SolicitorCard key={s.id} s={s} />)}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Bottom CTA */}
              <div style={{
                marginTop: '2.5rem',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '1.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.8rem',
              }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--white)' }}>
                  Need more help deciding which pathway to take?
                </p>
                <p style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  Browse the detailed pathway guides to understand your options, what documents you
                  need, and what to expect at each step — before you speak to a solicitor.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href="/pathways/uk" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    background: 'var(--safe)', color: 'white', padding: '0.55rem 1.3rem',
                    borderRadius: '3px', fontSize: '0.83rem', fontWeight: 600, textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}>
                    🇬🇧 UK Pathway Guides →
                  </Link>
                  <Link href="/pathways/eu" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    background: '#2563eb', color: 'white', padding: '0.55rem 1.3rem',
                    borderRadius: '3px', fontSize: '0.83rem', fontWeight: 600, textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}>
                    🇪🇺 EU Pathway Guides →
                  </Link>
                </div>
              </div>
            </main>

          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'solicitors');
  return { props: { pt } };
}
