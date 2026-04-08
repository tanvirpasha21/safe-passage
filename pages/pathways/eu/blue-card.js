import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import { getPageTranslations } from '../../../lib/i18n';

export default function EUBlueCard({ pt }) {
  return (
    <PathwayPage
      isEU
      meta={{ title: pt.meta.title, description: pt.meta.description }}
      breadcrumbs={[
        { href: '/pathways/eu', label: 'EU Pathways' },
        { href: '/pathways/eu/blue-card', label: 'EU Blue Card' },
      ]}
      hero={{
        icon: '💙',
        tag: pt.hero.tag,
        title: pt.hero.title,
        sub: pt.hero.sub,
      }}
      facts={[
        { label: pt.facts[0].label, value: pt.facts[0].value, color: 'Warning' },
        { label: pt.facts[1].label, value: pt.facts[1].value, color: 'Green' },
        { label: pt.facts[2].label, value: pt.facts[2].value, color: 'Green' },
        { label: pt.facts[3].label, value: pt.facts[3].value, color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Quick Facts</div>
            {[
              ['Family reunification', '6 months (fast track)'],
              ['Move to another EU state', 'After 18 months'],
              ['Path to permanent residence', '5 years'],
              ['Right to work', 'Yes — for your employer'],
            ].map(([l, v]) => (
              <div key={l} className={styles.factRow}>
                <span className={styles.factLabel}>{l}</span>
                <span className={styles.factVal} style={{ fontSize: '0.78rem' }}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official Links</div>
            {[
              ['Make it in Germany', 'https://www.make-it-in-germany.com'],
              ['EURES — EU job portal', 'https://eures.ec.europa.eu'],
              ['anabin (degree recognition)', 'https://anabin.kmk.org'],
              ['ENIC-NARIC EU network', 'https://www.enic-naric.net'],
            ].map(([label, href]) => (
              <div key={label} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={styles.solicitorLink}>{label} →</a>
              </div>
            ))}
          </div>
        </>
      }
    >
      <div className={styles.alertBox}>
        <span className={styles.alertIcon}>{pt.alert.icon}</span>
        <p className={styles.alertText}>{pt.alert.text}</p>
      </div>

      {/* Requirements */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Eligibility</span>
        <h2 className={styles.sectionTitle}>{pt.reqTitle}</h2>
        <ul className={styles.reqList}>
          {pt.requirements.map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Salary by country */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Salary Thresholds</span>
        <h2 className={styles.sectionTitle}>{pt.salaryTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
          {pt.salaries.map((s, i) => (
            <div key={i} className={styles.sideCard} style={{ margin: 0 }}>
              <div style={{ fontWeight: 700, color: 'var(--white)', marginBottom: '0.25rem' }}>{s.country}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--safe)', marginBottom: s.note ? '0.25rem' : 0 }}>{s.threshold}</div>
              {s.note && <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{s.note}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Step by Step</span>
        <h2 className={styles.sectionTitle}>{pt.stepsTitle}</h2>
        <div className={styles.steps}>
          {pt.steps.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepNum}>{i + 1}</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>{step.title}</div>
                <div className={styles.stepDesc}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Changes */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Latest Updates</span>
        <h2 className={styles.sectionTitle}>{pt.changesTitle}</h2>
        <div className={styles.changeCards}>
          {pt.changes.map((c, i) => (
            <div key={i} className={styles.changeCard}>
              <div className={styles.changeDate}>{c.date}</div>
              <div className={styles.changeTitle}>{c.title}</div>
              <div className={styles.changeDesc}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <SolicitorSection caseTypeSlug="skilled-worker" region="eu" title={pt.solicitorTitle} />
    </PathwayPage>
  );
}

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'eu-blue-card');
  return { props: { pt } };
}
