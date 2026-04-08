import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import { getPageTranslations } from '../../../lib/i18n';

export default function EUHumanitarian({ pt }) {
  return (
    <PathwayPage
      isEU
      meta={{ title: pt.meta.title, description: pt.meta.description }}
      breadcrumbs={[
        { href: '/pathways/eu', label: 'EU Pathways' },
        { href: '/pathways/eu/humanitarian', label: 'Humanitarian Visa' },
      ]}
      hero={{
        icon: '🤝',
        tag: pt.hero.tag,
        title: pt.hero.title,
        sub: pt.hero.sub,
      }}
      facts={[
        { label: pt.facts[0].label, value: pt.facts[0].value, color: 'Green' },
        { label: pt.facts[1].label, value: pt.facts[1].value, color: 'Green' },
        { label: pt.facts[2].label, value: pt.facts[2].value },
        { label: pt.facts[3].label, value: pt.facts[3].value },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official Links</div>
            {[
              ['Portugal immigration', 'https://www.sef.pt'],
              ['Spain embassy finder', 'https://www.exteriores.gob.es/en'],
              ['France embassy finder', 'https://www.france-visas.gouv.fr'],
              ['ECRE — legal help', 'https://ecre.org'],
              ['UNHCR — register', 'https://www.unhcr.org/register'],
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

      {/* What is it */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Explained</span>
        <h2 className={styles.sectionTitle}>{pt.whatTitle}</h2>
        <p style={{ fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.75 }}>{pt.what}</p>
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

      {/* Which countries */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Countries</span>
        <h2 className={styles.sectionTitle}>{pt.countriesTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {pt.countries.map((c, i) => (
            <div key={i} className={styles.sideCard} style={{ margin: 0 }}>
              <div style={{ fontWeight: 700, color: 'var(--white)', marginBottom: '0.5rem' }}>{c.name}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>{c.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.warningBox}>
        <span className={styles.alertIcon}>⚠️</span>
        <div className={styles.warningText}>{pt.warning}</div>
      </div>

      <SolicitorSection caseTypeSlug="asylum" region="eu" title={pt.solicitorTitle} />
    </PathwayPage>
  );
}

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'eu-humanitarian');
  return { props: { pt } };
}
