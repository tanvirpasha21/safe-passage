import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import { getPageTranslations } from '../../../lib/i18n';

export default function EUResettlement({ pt }) {
  return (
    <PathwayPage
      isEU
      meta={{ title: pt.meta.title, description: pt.meta.description }}
      breadcrumbs={[
        { href: '/pathways/eu', label: 'EU Pathways' },
        { href: '/pathways/eu/resettlement', label: 'EU Resettlement' },
      ]}
      hero={{
        icon: '✈️',
        tag: pt.hero.tag,
        title: pt.hero.title,
        sub: pt.hero.sub,
      }}
      facts={[
        { label: pt.facts[0].label, value: pt.facts[0].value, color: 'Green' },
        { label: pt.facts[1].label, value: pt.facts[1].value },
        { label: pt.facts[2].label, value: pt.facts[2].value },
        { label: pt.facts[3].label, value: pt.facts[3].value, color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official Links</div>
            {[
              ['UNHCR — register', 'https://www.unhcr.org/register'],
              ['EUAA resettlement info', 'https://euaa.europa.eu/asylum-support/resettlement'],
              ['EU resettlement platform', 'https://www.resettlement.eu'],
              ['Germany BAMF resettlement', 'https://www.bamf.de/EN/Themen/Aufnahme/Resettlement'],
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

      {/* Steps */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Step by Step</span>
        <h2 className={styles.sectionTitle}>{pt.howTitle}</h2>
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

      {pt.note && (
        <div className={styles.alertBox} style={{ background: 'rgba(233,196,74,0.06)', borderColor: 'rgba(233,196,74,0.2)' }}>
          <span className={styles.alertIcon}>ℹ️</span>
          <p className={styles.alertText}>{pt.note}</p>
        </div>
      )}

      <SolicitorSection caseTypeSlug="resettlement" region="eu" title={pt.solicitorTitle} />
    </PathwayPage>
  );
}

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'eu-resettlement');
  return { props: { pt } };
}
