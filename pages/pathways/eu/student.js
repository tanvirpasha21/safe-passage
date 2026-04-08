import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import { getPageTranslations } from '../../../lib/i18n';

export default function EUStudent({ pt }) {
  return (
    <PathwayPage
      isEU
      meta={{ title: pt.meta.title, description: pt.meta.description }}
      breadcrumbs={[
        { href: '/pathways/eu', label: 'EU Pathways' },
        { href: '/pathways/eu/student', label: 'Study in EU' },
      ]}
      hero={{
        icon: '🎓',
        tag: pt.hero.tag,
        title: pt.hero.title,
        sub: pt.hero.sub,
      }}
      facts={[
        { label: pt.facts[0].label, value: pt.facts[0].value, color: 'Green' },
        { label: pt.facts[1].label, value: pt.facts[1].value, color: 'Green' },
        { label: pt.facts[2].label, value: pt.facts[2].value, color: 'Warning' },
        { label: pt.facts[3].label, value: pt.facts[3].value, color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Key Scholarships</div>
            {(pt.scholarships || []).map((s, i) => (
              <div key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border)' }}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.solicitorLink}>{s.name} →</a>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official Links</div>
            {[
              ['DAAD (Germany)', 'https://www.daad.de/en/'],
              ['Erasmus+', 'https://erasmus-plus.ec.europa.eu/'],
              ['Campus France', 'https://www.campusfrance.org/en'],
              ['Study in Europe portal', 'https://education.ec.europa.eu/study-in-europe'],
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

      {/* Country options */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Where to Study</span>
        <h2 className={styles.sectionTitle}>{pt.optionsTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {pt.options.map((opt, i) => (
            <div key={i} className={styles.sideCard} style={{ margin: 0 }}>
              <div style={{ fontWeight: 700, color: 'var(--white)', marginBottom: '0.25rem' }}>{opt.country}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--safe)', marginBottom: '0.5rem' }}>{opt.highlight}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>{opt.desc}</div>
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

      <SolicitorSection caseTypeSlug="student" region="eu" title={pt.solicitorTitle} />
    </PathwayPage>
  );
}

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'eu-student');
  return { props: { pt } };
}
