import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import { getPageTranslations } from '../../../lib/i18n';

export default function UKSkilledWorker({ pt }) {
  return (
    <PathwayPage
      meta={{ title: pt.meta.title, description: pt.meta.description }}
      breadcrumbs={[
        { href: '/pathways/uk', label: 'UK Pathways' },
        { href: '/pathways/uk/skilled-worker', label: 'Skilled Worker Visa' },
      ]}
      hero={{
        icon: '💼',
        tag: pt.hero.tag,
        title: pt.hero.title,
        sub: pt.hero.sub,
      }}
      facts={[
        { label: pt.facts[0].label, value: pt.facts[0].value, color: 'Warning' },
        { label: pt.facts[1].label, value: pt.facts[1].value, color: 'Green' },
        { label: pt.facts[2].label, value: pt.facts[2].value, color: 'Warning' },
        { label: pt.facts[3].label, value: pt.facts[3].value, color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Quick Facts</div>
            {[
              ['Visa duration', 'Up to 5 years'],
              ['Family members', 'Can join you'],
              ['Right to work', 'Yes — for your sponsor'],
              ['Change employer', 'Yes — with new sponsorship'],
              ['ILR eligible', 'After 5 years'],
              ['NHS surcharge', '£1,035/year per person'],
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
              ['Apply for Skilled Worker Visa', 'https://www.gov.uk/skilled-worker-visa'],
              ['Check if your job qualifies', 'https://www.gov.uk/skilled-worker-visa/your-job'],
              ['Find a licensed sponsor', 'https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers'],
              ['Immigration Salary List', 'https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-immigration-salary-list'],
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

      {/* Shortage occupations */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Shortage Occupations</span>
        <h2 className={styles.sectionTitle}>{pt.shortageTitle}</h2>
        <ul className={styles.reqList}>
          {pt.shortageRoles.map((r, i) => (
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

      <SolicitorSection caseTypeSlug="skilled-worker" region="uk" title={pt.solicitorTitle} />
    </PathwayPage>
  );
}

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'uk-skilled-worker');
  return { props: { pt } };
}
