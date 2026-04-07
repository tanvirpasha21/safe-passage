import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';

export default function UKAsylum() {
  return (
    <PathwayPage
      meta={{
        title: 'Asylum in the UK — How to Apply',
        description: 'Complete guide to claiming asylum in the UK in 2025–2026. Steps, requirements, recent changes and authorised legal help.',
      }}
      breadcrumbs={[
        { href: '/pathways/uk', label: 'UK Pathways' },
        { href: '/pathways/uk/asylum', label: 'Asylum' },
      ]}
      hero={{
        icon: '🏛️',
        tag: 'Protection-Based · Updated April 2026',
        title: 'Claiming <em>Asylum</em> in the UK',
        sub: 'If you are fleeing persecution, war, torture or serious harm because of your race, religion, nationality, political opinion or social group — you have a legal right to claim asylum in the UK. This pathway is free, protected by international law, and gives you access to accommodation, food and support while your case is considered.',
      }}
      facts={[
        { label: 'Cost', value: 'Free', color: 'Green' },
        { label: 'Decision time', value: '6–18 months', color: 'Warning' },
        { label: 'Risk level', value: 'Low', color: 'Green' },
        { label: 'Legal basis', value: '1951 Refugee Convention' },
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
        <span className={styles.alertIcon}>✅</span>
        <p className={styles.alertText}>
          <strong>Claiming asylum is a legal right — not a crime.</strong> The UK is legally obligated
          under the 1951 Refugee Convention to consider your claim. You do not need documents to claim
          asylum. You do not need to pay anyone to make an asylum claim. If someone is charging you to
          "submit" your claim — they are scamming you.
        </p>
      </div>

      {/* Who qualifies */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Eligibility</span>
        <h2 className={styles.sectionTitle}>Who can claim asylum?</h2>
        <ul className={styles.reqList}>
          {[
            'You are outside your home country (or the country you last lived in).',
            'You cannot return because you have a well-founded fear of persecution.',
            'Persecution is based on race, religion, nationality, political opinion, or membership of a particular social group (including gender identity and sexual orientation).',
            'You are in the UK, have arrived at a UK border, or intend to arrive.',
            'You have not already been granted refugee status in another safe country.',
          ].map((r, i) => (
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
        <h2 className={styles.sectionTitle}>How to claim asylum</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Tell the authorities you want to claim asylum',
              desc: 'Tell a UK Border Force officer as soon as you arrive at a port or airport, or call the Home Office on 0300 123 7010 if you are already in the UK. Say the words "I want to claim asylum." You will not be arrested for doing this.',
            },
            {
              title: 'Screening interview (Registration)',
              desc: 'A short interview to record your basic details, photograph, and fingerprints. You will be asked how you entered the UK and why you left your country. This is not your full asylum interview — just registration.',
            },
            {
              title: 'Asylum support & accommodation',
              desc: 'While waiting for a decision, the Home Office provides free accommodation (NASS accommodation) and £49.18/week on a payment card if you cannot support yourself. You are legally entitled to this support.',
            },
            {
              title: 'Asylum interview (Substantive interview)',
              desc: 'A detailed interview with a Home Office caseworker about why you left and why you cannot return. You can bring a legal representative. You can request an interpreter. Take your time — accuracy matters more than speed.',
            },
            {
              title: 'Decision',
              desc: "You will receive a written decision — usually within 6 months of your interview. If granted refugee status, you receive 5 years' leave to remain, the right to work, and access to public funds.",
            },
            {
              title: 'If refused — appeal',
              desc: 'You have the right to appeal a refusal to the First-tier Tribunal (Immigration and Asylum Chamber). Most asylum cases have strong appeal rights. Get legal representation before the appeal deadline (usually 14 days).',
            },
          ].map((step, i) => (
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

      {/* What happens after */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>After a Decision</span>
        <h2 className={styles.sectionTitle}>What refugee status gives you</h2>
        <ul className={styles.reqList}>
          {[
            "5 years' leave to remain in the UK (renewable).",
            'Full right to work in any sector, with any employer.',
            'Access to the NHS, schools, benefits, and social housing.',
            'Right to travel on a UK Refugee Travel Document.',
            'Right to apply for family reunification — bring your spouse and children.',
            'Path to Indefinite Leave to Remain (ILR) after 5 years, then British citizenship.',
          ].map((r, i) => (
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
        <h2 className={styles.sectionTitle}>Recent changes to UK asylum (2024–2026)</h2>
        <div className={styles.changeCards}>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2025 — Border Security, Asylum and Immigration Bill</div>
            <div className={styles.changeTitle}>New processing reforms and streamlined decisions</div>
            <div className={styles.changeDesc}>
              The 2025 Bill introduced measures to speed up case processing, increase the caseworker
              workforce, and improve the backlog. The government committed to deciding straightforward
              cases within 6 months. This is positive for applicants with clear cases.
            </div>
          </div>
          <div className={`${styles.changeCard} ${styles.warn}`}>
            <div className={`${styles.changeDate} ${styles.warn}`}>2023 — Illegal Migration Act</div>
            <div className={styles.changeTitle}>Some provisions paused — legal challenges ongoing</div>
            <div className={styles.changeDesc}>
              Parts of the Illegal Migration Act 2023 that would have blocked asylum claims from people
              arriving irregularly were paused by courts. As of 2026, the standard asylum process remains
              available. Always check the current rules with a legal adviser before applying.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024 — Increased asylum support rates</div>
            <div className={styles.changeTitle}>Weekly support payment raised to £49.18</div>
            <div className={styles.changeDesc}>
              The weekly asylum support allowance was increased from £47.39 to £49.18 per person per week,
              providing slightly more financial support while applications are processed.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024 — Right to work rule unchanged</div>
            <div className={styles.changeTitle}>You can apply to work after 12 months of waiting</div>
            <div className={styles.changeDesc}>
              If your initial asylum decision has not been made within 12 months through no fault of your
              own, you can apply for permission to work in any role on the Shortage Occupation List.
            </div>
          </div>
        </div>
      </div>

      {/* Warning about illegal routes */}
      <div className={styles.warningBox}>
        <span className={styles.alertIcon}>⚠️</span>
        <div className={styles.warningText}>
          <strong>Do not pay a smuggler when you can claim asylum legally.</strong> Every year,
          thousands of people pay €3,000–€15,000 to cross the Channel or Mediterranean on dangerous
          boats — only to arrive in the UK and claim asylum anyway. You can claim asylum without
          endangering your life or wasting your savings. Contact Migrant Help free on{' '}
          <strong>0808 801 0503</strong> for guidance before you travel.
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="asylum"
        region="uk"
        title="Find Authorised Asylum Legal Help"
      />
    </PathwayPage>
  );
}
