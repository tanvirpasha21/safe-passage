import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';

export default function UKFamily() {
  return (
    <PathwayPage
      meta={{
        title: 'UK Family Visa 2025–2026 — Join Family in the UK',
        description: 'Full guide to UK Family Visas — spouse, partner, parent, child. Requirements, income thresholds 2024, processing times, and authorised legal help.',
      }}
      breadcrumbs={[
        { href: '/pathways/uk', label: 'UK Pathways' },
        { href: '/pathways/uk/family', label: 'Family Visa' },
      ]}
      hero={{
        icon: '👨‍👩‍👧',
        tag: 'Family-Based · Updated April 2026',
        title: 'UK <em>Family Visa</em>',
        sub: 'If you have a spouse, civil partner, unmarried partner, parent, or child who is a British citizen or has settled status (ILR/EUSS) in the UK, you may have the right to join them legally. Family visas give you the right to live, work, and build your life together in the UK.',
      }}
      facts={[
        { label: 'Application fee', value: '£1,846 (outside UK)', color: 'Warning' },
        { label: 'Processing time', value: '3–12 months', color: 'Warning' },
        { label: 'Min. income (sponsor)', value: '£29,000+', color: 'Warning' },
        { label: 'Path to settlement', value: '5 years', color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Income Thresholds (2025)</div>
            {[
              ['From April 2024', '£29,000/yr'],
              ['From late 2024', '£34,500/yr'],
              ['Final threshold', '£38,700/yr'],
              ['With children', 'Additional £3,800 per child'],
              ['Savings (alternative)', '£62,500+ for 2.5 years'],
            ].map(([l, v]) => (
              <div key={l} className={styles.factRow}>
                <span className={styles.factLabel}>{l}</span>
                <span className={styles.factVal}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Visa Types</div>
            {[
              ['Spouse / Civil Partner', 'Partner Visa'],
              ['Unmarried partner', '2 yrs cohabitation needed'],
              ['Fiancé(e)', 'Marriage within 6 months'],
              ['Child (under 18)', 'Child Visa'],
              ['Adult dependent relative', 'Very limited — high threshold'],
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
              ['Family visas overview', 'https://www.gov.uk/uk-family-visa'],
              ['Partner visa', 'https://www.gov.uk/uk-family-visa/partner-spouse'],
              ['Child visa', 'https://www.gov.uk/uk-family-visa/children'],
              ['Refugee family reunion', 'https://www.gov.uk/refugee-family-reunion'],
              ['Income calculator', 'https://www.gov.uk/government/publications/family-migration-appendix-fm-family-members'],
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
          <strong>Family reunification is a fundamental right.</strong> If you have a genuine family
          relationship with someone legally settled in the UK, you have a strong legal basis to join
          them. This route gives you permission to work immediately on arrival and leads to full
          settlement after 5 years. It is one of the most established and respected pathways.
        </p>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Who can sponsor</span>
        <h2 className={styles.sectionTitle}>Who in the UK can bring you</h2>
        <ul className={styles.reqList}>
          {[
            'A British citizen.',
            'A person with Indefinite Leave to Remain (ILR) — settled status.',
            'An EU citizen with Settled Status under the EU Settlement Scheme (EUSS).',
            'A person with refugee status or humanitarian protection (specific rules apply — see Refugee Family Reunion below).',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Partner / Spouse Visa</span>
        <h2 className={styles.sectionTitle}>Joining a spouse or partner</h2>
        <ul className={styles.reqList}>
          {[
            'You must be in a genuine, subsisting relationship (marriage, civil partnership, or 2+ years of living together).',
            'Both you and your partner must be 18 or over.',
            'Your sponsor must earn at least £29,000/year (rising to £38,700 by late 2025).',
            'Alternatively, savings of £62,500+ held for 28+ days can substitute for income.',
            'You must meet the English language requirement (A1 level initially, A2 to extend).',
            'The relationship must not be polygamous.',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Refugee Family Reunion</span>
        <h2 className={styles.sectionTitle}>If your family member has refugee status</h2>
        <div className={styles.alertBox}>
          <span className={styles.alertIcon}>❤️</span>
          <p className={styles.alertText}>
            <strong>Free and no income requirement.</strong> If your spouse, civil partner, or child
            (under 18) is recognised as a refugee or has humanitarian protection in the UK, you can
            join them completely free through the Refugee Family Reunion route. There is no income
            requirement and no English language test.
          </p>
        </div>
        <ul className={styles.reqList}>
          {[
            'The person in the UK must hold refugee status or humanitarian protection.',
            'You must have been part of the family unit before they fled.',
            'Eligible family members: spouse/civil partner, and dependent children under 18.',
            'No visa fee. No income requirement. No English language test.',
            'Apply from outside the UK at a British Embassy, High Commission or Consulate.',
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
        <h2 className={styles.sectionTitle}>How to apply for a Family Visa</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Gather evidence of your relationship',
              desc: 'Marriage certificate, civil partnership certificate, or evidence of cohabitation (2+ years of shared utility bills, tenancy agreements, photos, communications). The stronger and more consistent your evidence, the faster your application.',
            },
            {
              title: 'Your UK sponsor confirms their income',
              desc: 'Your partner in the UK must provide 6 months of payslips, P60, and bank statements showing they meet the income threshold. Self-employed sponsors need additional evidence. Start this early — it often takes time to gather.',
            },
            {
              title: 'Take the English language test',
              desc: 'Take an A1 CEFR test from an approved provider (usually a Secure English Language Test — SELT). IELTS Life Skills A1 is the most common. You may be exempt if you are a national of a majority English-speaking country, or have a degree taught in English.',
            },
            {
              title: 'Apply online and pay the fee',
              desc: 'Apply at gov.uk/uk-family-visa. The fee is £1,846 outside the UK plus the Immigration Health Surcharge (£1,035/year). This is expensive — but it covers your right to live, work, and access healthcare legally in the UK.',
            },
            {
              title: 'Biometric appointment',
              desc: 'Visit the nearest Visa Application Centre to provide biometrics. In some countries you can use the UK Immigration: ID Check app instead of attending in person.',
            },
            {
              title: 'Decision and travel',
              desc: 'You receive an initial 2.5-year leave to remain. After 2.5 years, extend for a further 2.5 years. After 5 years total, apply for Indefinite Leave to Remain (ILR) — permanent settlement in the UK.',
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

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Latest Updates</span>
        <h2 className={styles.sectionTitle}>Changes to family visa rules 2024–2026</h2>
        <div className={styles.changeCards}>
          <div className={`${styles.changeCard} ${styles.warn}`}>
            <div className={`${styles.changeDate} ${styles.warn}`}>April 2024</div>
            <div className={styles.changeTitle}>Income threshold raised to £29,000 (and rising)</div>
            <div className={styles.changeDesc}>
              The minimum income threshold for sponsors was raised from £18,600 to £29,000 in April 2024.
              It is scheduled to rise to £34,500 and eventually £38,700. This is a significant change —
              ensure your UK partner meets the current threshold before applying.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024</div>
            <div className={styles.changeTitle}>Cohabiting partner requirement remains 2 years</div>
            <div className={styles.changeDesc}>
              Unmarried partners must still demonstrate 2 continuous years of living together. Evidence
              must be consistent and credible. Joint bank accounts, shared tenancy, and regular
              communication records all strengthen the application.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2025</div>
            <div className={styles.changeTitle}>Digital ID Check app expanding to more countries</div>
            <div className={styles.changeDesc}>
              The UK Immigration: ID Check app, allowing applicants to submit biometrics digitally from
              home, is expanding to more countries. This makes the application process significantly faster
              and more accessible in participating countries.
            </div>
          </div>
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="family"
        region="uk"
        title="Get Legal Help with Your Family Visa"
      />
    </PathwayPage>
  );
}
