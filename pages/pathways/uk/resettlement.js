import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';

export default function UKResettlement() {
  return (
    <PathwayPage
      meta={{
        title: 'UK Resettlement Schemes 2025–2026 — UKRS, Afghan, Community Sponsorship',
        description: 'Full guide to UK Government resettlement programmes — UKRS, ACRS, ARAP, Community Sponsorship, and Homes for Ukraine. Updated 2025–2026.',
      }}
      breadcrumbs={[
        { href: '/pathways/uk', label: 'UK Pathways' },
        { href: '/pathways/uk/resettlement', label: 'Resettlement Schemes' },
      ]}
      hero={{
        icon: '✈️',
        tag: 'Humanitarian · Updated April 2026',
        title: 'UK <em>Resettlement</em> Schemes',
        sub: 'The UK Government runs official resettlement programmes that bring the most vulnerable people directly from dangerous situations to the UK — safely, legally, on a plane. You do not need to pay a smuggler. You do not need to risk your life. If you are eligible, you can come to the UK for free.',
      }}
      facts={[
        { label: 'Cost', value: 'Completely free', color: 'Green' },
        { label: 'Processing', value: '6 months–2 years', color: 'Warning' },
        { label: 'Accommodation', value: 'Provided on arrival', color: 'Green' },
        { label: 'Legal status', value: '5 years leave to remain', color: 'Green' },
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
            <div className={styles.sideCardTitle}>On Arrival You Receive</div>
            {[
              ['Housing', '✓ Provided'],
              ['Finances', '✓ Integration loan'],
              ['NHS access', '✓ Free healthcare'],
              ['Schools', '✓ For children'],
              ['Right to work', '✓ Immediate'],
              ['Benefits', '✓ Universal Credit eligible'],
            ].map(([l, v]) => (
              <div key={l} className={styles.factRow}>
                <span className={styles.factLabel}>{l}</span>
                <span className={styles.factVal} style={{ color: 'var(--safe)' }}>{v}</span>
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
              ['UNHCR referrals', 'https://www.unhcr.org/resettlement'],
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
          <strong>You can come to the UK on a plane — for free.</strong> UK resettlement schemes
          fly eligible refugees directly from camps and transit countries to the UK, with housing and
          support ready. Paying a smuggler to risk your life on a boat when this route exists is
          unnecessary and dangerous. Register with UNHCR in your current country first.
        </p>
      </div>

      {/* UKRS */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Scheme 1</span>
        <h2 className={styles.sectionTitle}>UK Resettlement Scheme (UKRS)</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.2rem', lineHeight: 1.65 }}>
          The UK's main global resettlement programme, open to refugees referred by UNHCR worldwide.
          Priority is given to the most vulnerable — survivors of torture, women and girls at risk,
          those with serious medical needs, and unaccompanied children.
        </p>
        <ul className={styles.reqList}>
          {[
            'You must be registered with UNHCR as a person of concern.',
            'UNHCR assesses your vulnerability and refers you to the UK.',
            'You do not apply directly — UNHCR identifies and refers eligible people.',
            'On arrival: 5 years Leave to Remain, housing, orientation support, right to work, access to benefits.',
            'After 5 years: apply for Indefinite Leave to Remain (ILR), then British citizenship.',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ACRS */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Scheme 2</span>
        <h2 className={styles.sectionTitle}>Afghan Citizens Resettlement Scheme (ACRS)</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.2rem', lineHeight: 1.65 }}>
          For Afghan nationals who are at risk due to the situation in Afghanistan following August 2021.
          Focuses on women, girls, minorities, and those who assisted UK or NATO forces.
        </p>
        <ul className={styles.reqList}>
          {[
            'Pathway 1: UNHCR-referred Afghans who have already been resettled in a third country.',
            'Pathway 2: Afghans who supported the UK or international community — journalists, human rights defenders, judges, women in prominent roles.',
            'Pathway 3: Families of those already in the UK under ACRS or ARAP.',
            'Register your interest with the Home Office or UNHCR.',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ARAP */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Scheme 3</span>
        <h2 className={styles.sectionTitle}>Afghan Relocations and Assistance Policy (ARAP)</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.2rem', lineHeight: 1.65 }}>
          For Afghan nationals who worked directly for or alongside UK Armed Forces or the UK Government
          in Afghanistan, and their families.
        </p>
        <ul className={styles.reqList}>
          {[
            'You worked for the UK Government, UK Armed Forces, or contractors in Afghanistan.',
            'Your service ended after 1 November 2001.',
            'You are at serious risk due to your work for the UK.',
            'Apply directly through the ARAP application portal.',
            'Family members (spouse and children) can also come.',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Community Sponsorship */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Scheme 4</span>
        <h2 className={styles.sectionTitle}>Community Sponsorship</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.2rem', lineHeight: 1.65 }}>
          Community and faith groups across the UK can sponsor a refugee family — providing housing,
          support, and integration help for the first year. Refugees come through UNHCR referral and
          receive the same rights as UKRS arrivals.
        </p>
        <ul className={styles.reqList}>
          {[
            'A UK community or faith group applies to sponsor your resettlement.',
            'UNHCR refers eligible refugees to the Community Sponsorship programme.',
            'The sponsoring group provides housing, English language classes, and support for 12 months.',
            '5 years Leave to Remain on arrival, with access to work and benefits.',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Homes for Ukraine */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Scheme 5</span>
        <h2 className={styles.sectionTitle}>Homes for Ukraine</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.2rem', lineHeight: 1.65 }}>
          For Ukrainian nationals fleeing the conflict. A named sponsor in the UK provides free
          accommodation for at least 6 months.
        </p>
        <ul className={styles.reqList}>
          {[
            'You are a Ukrainian national or the immediate family member of a Ukrainian national.',
            'You have a named UK sponsor offering free accommodation.',
            'Apply from outside the UK.',
            '18 months Leave to Remain (extendable to 36 months), right to work, NHS access.',
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
        <h2 className={styles.sectionTitle}>Changes to resettlement schemes 2024–2026</h2>
        <div className={styles.changeCards}>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2025</div>
            <div className={styles.changeTitle}>UKRS continued — government committed to annual quotas</div>
            <div className={styles.changeDesc}>
              The UK government reaffirmed its commitment to resettlement through UNHCR referrals for
              2025–2026. Vulnerable refugees, particularly women at risk and survivors of trafficking,
              continue to be prioritised.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024–2025</div>
            <div className={styles.changeTitle}>ARAP processing improved</div>
            <div className={styles.changeDesc}>
              The Home Office made changes to accelerate ARAP processing after criticism of delays.
              Afghan nationals who worked for the UK government and are at risk should apply
              immediately through the official portal.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024</div>
            <div className={styles.changeTitle}>Homes for Ukraine extended through 2025</div>
            <div className={styles.changeDesc}>
              The Homes for Ukraine scheme was extended, allowing Ukrainian nationals to continue
              arriving and extending existing visas. Ukrainians in the UK can now apply for extensions
              to their leave to remain.
            </div>
          </div>
        </div>
      </div>

      <div className={styles.warningBox}>
        <span className={styles.alertIcon}>⚠️</span>
        <div className={styles.warningText}>
          <strong>Register with UNHCR first — do not pay anyone.</strong> All UK resettlement
          schemes work through UNHCR registration or official government applications. They are
          completely free. If anyone tells you they can "fast-track" your resettlement for a fee —
          this is a scam. Contact UNHCR directly at unhcr.org/get-help.
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="resettlement"
        region="uk"
        title="Free Legal Help for Resettlement"
      />
    </PathwayPage>
  );
}
