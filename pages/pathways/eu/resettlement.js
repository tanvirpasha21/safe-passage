import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';

export default function EUResettlement() {
  return (
    <PathwayPage
      isEU
      meta={{
        title: 'EU Resettlement — Come to Europe Safely and Legally',
        description: 'EU Union Resettlement Framework, national programmes in Germany, France, Sweden, Netherlands. How to register with UNHCR for EU resettlement.',
      }}
      breadcrumbs={[
        { href: '/pathways/eu', label: 'EU Pathways' },
        { href: '/pathways/eu/resettlement', label: 'Resettlement' },
      ]}
      hero={{
        icon: '✈️',
        tag: 'Humanitarian · EU · Updated April 2026',
        title: 'EU <span class="eu">Resettlement</span> Programmes',
        sub: "The European Union and its member states run official resettlement programmes that bring the world's most vulnerable refugees directly to Europe — safely, legally, on a plane. You do not need to pay a smuggler. You do not need to cross the Mediterranean. Register with UNHCR where you are.",
      }}
      facts={[
        { label: 'Cost', value: 'Completely free', color: 'Green' },
        { label: 'Referred by', value: 'UNHCR only', color: 'Blue' },
        { label: 'Processing', value: '1–2 years', color: 'Warning' },
        { label: 'Status on arrival', value: 'Refugee status + residence permit', color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>EU Countries with Active Programmes</div>
            {[
              ['Germany', '~5,500/year'],
              ['France', '~3,000/year'],
              ['Sweden', '~2,000/year'],
              ['Netherlands', '~500/year'],
              ['Belgium', '~400/year'],
              ['Finland', '~1,050/year'],
              ['Ireland', '~1,000/year'],
              ['Portugal', '~250/year'],
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
              ['UNHCR Resettlement', 'https://www.unhcr.org/resettlement'],
              ['EU Resettlement Framework', 'https://ec.europa.eu/home-affairs/policies/migration-and-asylum/legal-migration-and-integration/resettlement-and-humanitarian-admission_en'],
              ['EUAA Resettlement', 'https://euaa.europa.eu/resettlement'],
              ['Germany BAMF Resettlement', 'https://www.bamf.de/EN/Themen/Aufnahme/Resettlement/resettlement-node.html'],
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
        <span className={styles.alertIcon}>✈️</span>
        <p className={styles.alertText}>
          <strong>Resettlement means a flight, not a boat.</strong> Resettlement programmes bring
          refugees directly from camps and transit countries to Europe on commercial or chartered flights.
          Housing, integration support, and a residence permit are waiting on arrival. This is the
          safest pathway that exists — and it is completely free.
        </p>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>How it works</span>
        <h2 className={styles.sectionTitle}>The EU resettlement process</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Register with UNHCR',
              desc: 'Register at the nearest UNHCR office in your current country. UNHCR will assess your protection needs. Registration is free and you do not need documents to register — UNHCR will help establish your identity.',
            },
            {
              title: 'UNHCR assessment and referral',
              desc: 'UNHCR identifies the most vulnerable cases for resettlement — those who cannot be protected locally and cannot return home. This includes survivors of violence, people with serious medical needs, women and children at risk, and unaccompanied minors.',
            },
            {
              title: 'EU country interview',
              desc: 'A resettlement officer from the receiving EU country (Germany, France, Sweden, etc.) interviews you and your family. This is a positive conversation — they are assessing your needs to help you integrate, not looking for reasons to refuse.',
            },
            {
              title: 'Pre-departure preparations',
              desc: 'Once accepted, you receive orientation training about life in the destination country — language basics, culture, rights, and what to expect. Travel documents and flights are arranged.',
            },
            {
              title: 'Arrival and reception',
              desc: 'You arrive on a scheduled flight. On arrival, you receive a residence permit, access to housing, integration support, language classes, and help finding employment. Children are enrolled in school.',
            },
          ].map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={`${styles.stepNum} ${styles.stepNumEU}`}>{i + 1}</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>{step.title}</div>
                <div className={styles.stepDesc}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Latest Updates</span>
        <h2 className={styles.sectionTitle}>EU resettlement developments 2024–2026</h2>
        <div className={styles.changeCards}>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024 — EU Pact</div>
            <div className={styles.changeTitle}>Union Resettlement Framework strengthened</div>
            <div className={styles.changeDesc}>
              The EU Pact on Migration includes a stronger Union Resettlement and Humanitarian Admission
              Framework, encouraging all EU member states to participate with annual pledging conferences.
              The target is 60,000+ resettlement places per year across the EU.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2025</div>
            <div className={styles.changeTitle}>Germany expanded resettlement quota</div>
            <div className={styles.changeDesc}>
              Germany increased its annual resettlement quota and continued prioritising Afghans, Syrians,
              and sub-Saharan Africans with UNHCR referrals. Germany's BAMF office processes resettlement
              cases in transit countries including Jordan, Lebanon, Turkey, and Kenya.
            </div>
          </div>
        </div>
      </div>

      <div className={styles.warningBox}>
        <span className={styles.alertIcon}>⚠️</span>
        <div className={styles.warningText}>
          <strong>Nobody can sell you a resettlement place — it is always free.</strong> If anyone
          tells you they can secure EU resettlement for a fee, this is a scam and likely a trafficking
          operation. Resettlement is only done through UNHCR. Register with UNHCR directly at
          unhcr.org/get-help — it costs nothing.
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="resettlement"
        region="eu"
        title="Free Legal Help — Register with UNHCR"
      />
    </PathwayPage>
  );
}
