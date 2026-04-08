import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import { getPageTranslations } from '../../../lib/i18n';

export default function UKAsylum({ pt }) {
  return (
    <PathwayPage
      meta={{ title: pt.meta.title, description: pt.meta.description }}
      breadcrumbs={[
        { href: '/pathways/uk', label: 'UK Pathways' },
        { href: '/pathways/uk/asylum', label: 'Asylum' },
      ]}
      hero={{
        icon: '🏛️',
        tag: pt.hero.tag,
        title: pt.hero.title,
        sub: pt.hero.sub,
      }}
      facts={[
        { label: pt.facts[0].label, value: pt.facts[0].value, color: 'Green' },
        { label: pt.facts[1].label, value: pt.facts[1].value, color: 'Warning' },
        { label: pt.facts[2].label, value: pt.facts[2].value, color: 'Green' },
        { label: pt.facts[3].label, value: pt.facts[3].value },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Quick Facts</div>
            {[
              ['Fee', 'Free'],
              ['Application', 'In person at a UKVI office'],
              ['Support during wait', 'Accommodation + £49.18/week'],
              ['Right to work', 'After 12 months waiting'],
              ['Decision appeal', 'Yes — First-tier Tribunal'],
              ['Family reunion', 'Yes — after recognition'],
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
              ['Apply for asylum', 'https://www.gov.uk/claim-asylum'],
              ['Check your case status', 'https://www.gov.uk/view-prove-immigration-status'],
              ['Asylum support', 'https://www.gov.uk/asylum-support'],
              ['Appeal a decision', 'https://www.gov.uk/immigration-asylum-tribunal'],
            ].map(([label, href]) => (
              <div key={label} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={styles.solicitorLink}>{label} →</a>
              </div>
            ))}
          </div>
        </>
      }
    >
      {/* Alert */}
      <div className={styles.alertBox}>
        <span className={styles.alertIcon}>{pt.alert.icon}</span>
        <p className={styles.alertText}>{pt.alert.text}</p>
      </div>

      {/* Who qualifies */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Eligibility</span>
        <h2 className={styles.sectionTitle}>{pt.eligibilityTitle}</h2>
        <ul className={styles.reqList}>
          {pt.eligibility.map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* How to apply */}
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

      {/* After decision */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>After a Decision</span>
        <h2 className={styles.sectionTitle}>{pt.afterTitle}</h2>
        <ul className={styles.reqList}>
          {pt.after.map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent changes */}
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

      {/* Warning */}
      <div className={styles.warningBox}>
        <span className={styles.alertIcon}>⚠️</span>
        <div className={styles.warningText}>{pt.warning}</div>
      </div>

      <SolicitorSection caseTypeSlug="asylum" region="uk" title={pt.solicitorTitle} />
    </PathwayPage>
  );
}

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'uk-asylum');
  return { props: { pt } };
}
