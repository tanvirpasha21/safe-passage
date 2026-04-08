import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import { getPageTranslations } from '../../../lib/i18n';

export default function UKResettlement({ pt }) {
  return (
    <PathwayPage
      meta={{ title: pt.meta.title, description: pt.meta.description }}
      breadcrumbs={[
        { href: '/pathways/uk', label: 'UK Pathways' },
        { href: '/pathways/uk/resettlement', label: 'Resettlement Schemes' },
      ]}
      hero={{
        icon: '✈️',
        tag: pt.hero.tag,
        title: pt.hero.title,
        sub: pt.hero.sub,
      }}
      facts={[
        { label: pt.facts[0].label, value: pt.facts[0].value, color: 'Green' },
        { label: pt.facts[1].label, value: pt.facts[1].value, color: 'Warning' },
        { label: pt.facts[2].label, value: pt.facts[2].value, color: 'Green' },
        { label: pt.facts[3].label, value: pt.facts[3].value, color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Available Schemes</div>
            {[
              ['UKRS', 'General refugee resettlement'],
              ['ACRS', 'Afghanistan (civilians)'],
              ['ARAP', 'Afghanistan (ex-employees)'],
              ['Community Sponsorship', 'Community-led resettlement'],
              ['Homes for Ukraine', 'Ukrainian nationals'],
              ['Mandate Resettlement', 'UNHCR referrals'],
            ].map(([l, v]) => (
              <div key={l} className={styles.factRow}>
                <span className={styles.factLabel}>{l}</span>
                <span className={styles.factVal} style={{ fontSize: '0.75rem' }}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official Links</div>
            {[
              ['UK Resettlement Scheme', 'https://www.gov.uk/government/publications/uk-resettlement-scheme-information-for-refugees'],
              ['ACRS — Afghan scheme', 'https://www.gov.uk/guidance/afghan-citizens-resettlement-scheme'],
              ['ARAP — Afghan staff', 'https://www.gov.uk/guidance/afghan-relocations-and-assistance-policy'],
              ['Homes for Ukraine', 'https://www.gov.uk/register-interest-homes-ukraine'],
              ['Community Sponsorship', 'https://www.gov.uk/government/publications/community-sponsorship-how-you-can-make-it-happen'],
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

      {/* Schemes */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Official Programmes</span>
        <h2 className={styles.sectionTitle}>{pt.schemesTitle}</h2>
        {pt.schemes.map((scheme, i) => (
          <div key={i} style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--white)', margin: 0 }}>{scheme.name}</h3>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--safe)', background: 'rgba(42,157,143,0.1)', border: '1px solid rgba(42,157,143,0.2)', borderRadius: '3px', padding: '0.2rem 0.5rem' }}>{scheme.tag}</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '0.75rem' }}>{scheme.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div className={styles.sideCard} style={{ margin: 0, padding: '0.75rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '0.3rem' }}>Who</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--light)' }}>{scheme.who}</div>
              </div>
              <div className={styles.sideCard} style={{ margin: 0, padding: '0.75rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', marginBottom: '0.3rem' }}>How to apply</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--light)' }}>{scheme.howApply}</div>
              </div>
            </div>
          </div>
        ))}
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

      <div className={styles.warningBox}>
        <span className={styles.alertIcon}>⚠️</span>
        <div className={styles.warningText}>{pt.warning}</div>
      </div>

      <SolicitorSection caseTypeSlug="resettlement" region="uk" title={pt.solicitorTitle} />
    </PathwayPage>
  );
}

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'uk-resettlement');
  return { props: { pt } };
}
