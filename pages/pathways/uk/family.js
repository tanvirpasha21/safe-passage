import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import { getPageTranslations } from '../../../lib/i18n';

export default function UKFamily({ pt }) {
  return (
    <PathwayPage
      meta={{ title: pt.meta.title, description: pt.meta.description }}
      breadcrumbs={[
        { href: '/pathways/uk', label: 'UK Pathways' },
        { href: '/pathways/uk/family', label: 'Family Visa' },
      ]}
      hero={{
        icon: '👨‍👩‍👧',
        tag: pt.hero.tag,
        title: pt.hero.title,
        sub: pt.hero.sub,
      }}
      facts={[
        { label: pt.facts[0].label, value: pt.facts[0].value, color: 'Warning' },
        { label: pt.facts[1].label, value: pt.facts[1].value, color: 'Warning' },
        { label: pt.facts[2].label, value: pt.facts[2].value, color: 'Green' },
        { label: pt.facts[3].label, value: pt.facts[3].value, color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Income Thresholds (2025)</div>
            {[
              ['From April 2024', '£29,000/yr'],
              ['From late 2024', '£34,500/yr'],
              ['Final threshold', '£38,700/yr'],
              ['With children', 'Additional £3,800 per child'],
              ['Savings (alternative)', '£62,500+ for 2.5 years'],
            ].map(([l, v]) => (
              <div key={l} className={styles.factRow}>
                <span className={styles.factLabel}>{l}</span>
                <span className={styles.factVal}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official Links</div>
            {[
              ['Family visas overview', 'https://www.gov.uk/uk-family-visa'],
              ['Partner visa', 'https://www.gov.uk/uk-family-visa/partner-spouse'],
              ['Child visa', 'https://www.gov.uk/uk-family-visa/children'],
              ['Refugee family reunion', 'https://www.gov.uk/refugee-family-reunion'],
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

      {/* Visa types */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Visa Types</span>
        <h2 className={styles.sectionTitle}>{pt.typesTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {pt.types.map((t, i) => (
            <div key={i} className={styles.sideCard} style={{ margin: 0 }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{t.icon}</div>
              <div className={styles.sideCardTitle} style={{ marginBottom: '0.4rem' }}>{t.name}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Requirements</span>
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

      <div className={styles.warningBox}>
        <span className={styles.alertIcon}>⚠️</span>
        <div className={styles.warningText}>{pt.warning}</div>
      </div>

      <SolicitorSection caseTypeSlug="family" region="uk" title={pt.solicitorTitle} />
    </PathwayPage>
  );
}

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'uk-family');
  return { props: { pt } };
}
