import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import { getPageTranslations } from '../../../lib/i18n';

export default function EUFamily({ pt }) {
  return (
    <PathwayPage
      isEU
      meta={{ title: pt.meta.title, description: pt.meta.description }}
      breadcrumbs={[
        { href: '/pathways/eu', label: 'EU Pathways' },
        { href: '/pathways/eu/family', label: 'Family Reunification' },
      ]}
      hero={{
        icon: '👨‍👩‍👧',
        tag: pt.hero.tag,
        title: pt.hero.title,
        sub: pt.hero.sub,
      }}
      facts={[
        { label: pt.facts[0].label, value: pt.facts[0].value },
        { label: pt.facts[1].label, value: pt.facts[1].value },
        { label: pt.facts[2].label, value: pt.facts[2].value, color: 'Warning' },
        { label: pt.facts[3].label, value: pt.facts[3].value, color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official Links</div>
            {[
              ['EU Family Reunification Directive', 'https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=celex%3A32003L0086'],
              ['Germany family visa', 'https://www.bamf.de/EN/Themen/MigrationAufenthalt/FamiliennachzugZuDrittstaatangehoerigen'],
              ['France family reunification', 'https://www.ofii.fr'],
              ['Netherlands Nuffic guide', 'https://www.ind.nl/en/family'],
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

      {/* Types */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Who Can Apply</span>
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

      <SolicitorSection caseTypeSlug="family" region="eu" title={pt.solicitorTitle} />
    </PathwayPage>
  );
}

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'eu-family');
  return { props: { pt } };
}
