import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';

export default function EUAsylum() {
  return (
    <PathwayPage
      isEU
      meta={{
        title: 'Asylum in the EU — How to Apply (2025–2026)',
        description: 'Complete guide to claiming asylum in EU countries. New EU Pact on Migration, how to apply, reception conditions, rights, and legal help.',
      }}
      breadcrumbs={[
        { href: '/pathways/eu', label: 'EU Pathways' },
        { href: '/pathways/eu/asylum', label: 'Asylum' },
      ]}
      hero={{
        icon: '🏛️',
        tag: 'Protection-Based · EU · Updated April 2026',
        title: 'Claiming Asylum <span class="eu">in the EU</span>',
        sub: 'Every EU member state is legally bound by the 1951 Refugee Convention and EU law to consider asylum claims. If you are fleeing persecution, war, or serious harm, you can claim international protection in any EU country. The process is free. You do not need to pay anyone to submit your claim.',
      }}
      facts={[
        { label: 'Cost', value: 'Free', color: 'Green' },
        { label: 'Decision time', value: '6–18 months', color: 'Warning' },
        { label: 'Right to stay during', value: 'Yes — cannot be expelled', color: 'Green' },
        { label: 'Legal basis', value: '1951 Convention + EU Qualification Directive' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Top Receiving EU Countries</div>
            {[
              ['Germany', '~350,000 claims/yr'],
              ['France', '~167,000 claims/yr'],
              ['Spain', '~163,000 claims/yr'],
              ['Italy', '~130,000 claims/yr'],
              ['Netherlands', '~60,000 claims/yr'],
              ['Belgium', '~35,000 claims/yr'],
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
              ['EUAA — Asylum info by country', 'https://euaa.europa.eu/asylum-support/information-country-origin'],
              ['AIDA — country asylum guides', 'https://asylumineurope.org'],
              ['UNHCR Europe', 'https://www.unhcr.org/europe'],
              ['Germany BAMF', 'https://www.bamf.de/EN'],
              ['France OFPRA', 'https://www.ofpra.gouv.fr/en'],
              ['Spain OAMI', 'https://www.inclusion.gob.es/web/migraciones/w/oficina-de-asilo-y-refugio'],
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
        <span className={styles.alertIcon}>✅</span>
        <p className={styles.alertText}>
          <strong>You can apply at any EU country's border or inside the country.</strong> You do
          not need to apply in the first EU country you enter (though Dublin Regulation rules apply —
          see below). Claiming asylum is a legal right — you cannot be criminalised for claiming it.
        </p>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Eligibility</span>
        <h2 className={styles.sectionTitle}>Who qualifies for international protection?</h2>
        <ul className={styles.reqList}>
          {[
            'Refugee status: You face persecution based on race, religion, nationality, political opinion, or social group.',
            'Subsidiary protection: You face a real risk of serious harm (death penalty, torture, indiscriminate violence in armed conflict) that does not meet the full refugee definition.',
            'Both statuses give you the right to stay, work, and access services in the EU.',
            'You must be outside your country of origin.',
            'You must not be excluded (e.g. serious criminal offence, war crime, crime against humanity).',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Step by Step</span>
        <h2 className={styles.sectionTitle}>How to claim asylum in an EU country</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Express your intention to claim asylum',
              desc: 'Tell a border guard, police officer, or immigration official that you want to claim asylum or international protection. You can say this in any language. You will be referred to the asylum authority.',
            },
            {
              title: 'Registration and fingerprinting (Eurodac)',
              desc: 'Your fingerprints and photo will be taken and entered into the EU Eurodac database. This is how the Dublin Regulation determines which EU country is responsible for your claim. Do not be afraid of this step — it is required.',
            },
            {
              title: 'Reception conditions',
              desc: 'While your claim is processed, you are entitled to accommodation, food, healthcare, and a minimum allowance. Standards vary by country — Germany, Netherlands, and Sweden generally have better reception conditions.',
            },
            {
              title: 'Personal interview',
              desc: 'You will have an in-depth interview with an asylum caseworker about why you fled and why you cannot return. You can request an interpreter. You can bring a legal representative. Take your time and be as detailed and truthful as possible.',
            },
            {
              title: 'Decision',
              desc: 'The asylum authority issues a written decision. Under the new EU Pact (2026 implementation), decisions should be made within 6 months. If granted, you receive a residence permit, right to work, and access to integration support.',
            },
            {
              title: 'If refused — appeal',
              desc: 'All EU countries must provide an effective appeal mechanism. You have the right to appeal to an administrative tribunal. You can usually stay during the appeal. Get legal help before the deadline — which varies by country (typically 7–30 days).',
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
        <span className={styles.sectionLabel}>Dublin Regulation</span>
        <h2 className={styles.sectionTitle}>Which EU country handles your claim?</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '1rem', lineHeight: 1.65 }}>
          The Dublin III Regulation determines which EU member state is responsible for your asylum claim.
          In most cases, it is the first EU country where you were fingerprinted. However there are
          important exceptions:
        </p>
        <ul className={styles.reqList}>
          {[
            'If you have family members (spouse, children, parents) already with protection in another EU country — that country should be responsible.',
            'If you are an unaccompanied minor — the country where your family member lives takes priority.',
            'Humanitarian and compassionate grounds can override the Dublin rules.',
            'If a country fails to respond to a Dublin transfer request within 2 months, responsibility shifts.',
            'You can apply for a transfer to the EU country where your family member legally resides.',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Latest Updates</span>
        <h2 className={styles.sectionTitle}>EU Pact on Migration and Asylum (2024–2026)</h2>
        <div className={styles.changeCards}>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>April 2024 — Historic reform</div>
            <div className={styles.changeTitle}>EU Pact on Migration adopted — implementation by 2026</div>
            <div className={styles.changeDesc}>
              The EU adopted the most significant reform to European asylum law in two decades.
              The Pact introduces mandatory solidarity between member states, faster border procedures,
              improved reception conditions, and stronger rights for applicants. Full implementation
              is required by June 2026.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024</div>
            <div className={styles.changeTitle}>Asylum Procedures Regulation — 6-month decision target</div>
            <div className={styles.changeDesc}>
              The new Asylum Procedures Regulation sets a 6-month target for first-instance decisions
              across all EU states, with a maximum of 12 months. This is a major improvement over the
              current average of 12–18 months in many countries.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024–2025</div>
            <div className={styles.changeTitle}>Reception Conditions Directive recast — improved standards</div>
            <div className={styles.changeDesc}>
              The recast Reception Conditions Directive ensures all EU countries provide adequate housing,
              food, healthcare and allowances. Asylum seekers must be given access to the labour market
              within 6 months of applying — down from 9 months.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2025</div>
            <div className={styles.changeTitle}>Germany maintains largest reception capacity</div>
            <div className={styles.changeDesc}>
              Germany continued to receive the highest number of asylum applications in the EU and
              maintained its BAMF (Federal Office for Migration and Refugees) capacity. Recognition
              rates for Syrians, Afghans, and Eritreans remain high.
            </div>
          </div>
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="asylum"
        region="eu"
        title="Find Free Legal Help Across Europe"
      />
    </PathwayPage>
  );
}
