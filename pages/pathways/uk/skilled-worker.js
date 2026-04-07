import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';

export default function UKSkilledWorker() {
  return (
    <PathwayPage
      meta={{
        title: 'UK Skilled Worker Visa 2025–2026',
        description: 'Full guide to the UK Skilled Worker Visa — requirements, salary thresholds, shortage occupations, how to apply, and latest 2025 changes.',
      }}
      breadcrumbs={[
        { href: '/pathways/uk', label: 'UK Pathways' },
        { href: '/pathways/uk/skilled-worker', label: 'Skilled Worker Visa' },
      ]}
      hero={{
        icon: '💼',
        tag: 'Work-Based · Updated April 2026',
        title: 'UK <em>Skilled Worker</em> Visa',
        sub: 'The UK Skilled Worker Visa is the main route for qualified professionals to live and work in the UK legally. If you have a job offer from a UK employer with a sponsor licence, you can apply — and bring your family with you.',
      }}
      facts={[
        { label: 'Visa fee', value: '£719–£1,769', color: 'Warning' },
        { label: 'Processing time', value: '3–8 weeks', color: 'Green' },
        { label: 'Min. salary (2025)', value: '£38,700', color: 'Warning' },
        { label: 'Path to settlement', value: '5 years', color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Quick Facts</div>
            {[
              ['Visa duration', 'Up to 5 years'],
              ['Family members', 'Can join you'],
              ['Right to work', 'Yes — for your sponsor'],
              ['Change employer', 'Yes — with new sponsorship'],
              ['ILR eligible', 'After 5 years'],
              ['NHS surcharge', '£1,035/year per person'],
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
              ['Apply for Skilled Worker Visa', 'https://www.gov.uk/skilled-worker-visa'],
              ['Check if your job qualifies', 'https://www.gov.uk/skilled-worker-visa/your-job'],
              ['Shortage Occupation List', 'https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-shortage-occupation-list'],
              ['Find a licensed sponsor', 'https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers'],
              ['Make it in Germany', 'https://www.make-it-in-germany.com'],
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
          <strong>The UK is actively recruiting.</strong> There are over 200,000 open vacancies in
          healthcare, engineering, construction, IT, and care work. Employers in these sectors are
          licensed to sponsor skilled workers from anywhere in the world — legally, safely, with
          full employment rights from day one.
        </p>
      </div>

      {/* Requirements */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Requirements</span>
        <h2 className={styles.sectionTitle}>What you need to qualify</h2>
        <ul className={styles.reqList}>
          {[
            'A confirmed job offer from a UK employer with a valid UKVI Sponsor Licence.',
            'The job must be at RQF Level 3 or above (A-level equivalent or higher).',
            'Salary of at least £38,700/year (general threshold from April 2024) OR the "going rate" for your specific occupation — whichever is higher.',
            'Lower salary thresholds apply for shortage occupations, new entrants (under 26), and PhD-level roles.',
            'You will receive a Certificate of Sponsorship (CoS) reference number from your employer.',
            'English language ability at CEFR B1 level or above (or exemptions apply).',
            'Enough money to support yourself: £1,270 in your bank account for at least 28 days (unless your sponsor certifies maintenance).',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Shortage occupations */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Shortage Occupations — Lower Salary Threshold</span>
        <h2 className={styles.sectionTitle}>High-demand roles (2025–2026)</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', marginBottom: '1.2rem', lineHeight: 1.65 }}>
          These roles have reduced salary requirements and are especially welcoming of international applicants:
        </p>
        <ul className={styles.reqList}>
          {[
            'Nurses and midwives (NHS and private)',
            'Senior care workers',
            'Civil engineers and structural engineers',
            'Software developers and IT architects',
            'Veterinarians',
            'Secondary school teachers (especially STEM subjects)',
            'Welders and pipe fitters',
            'HGV drivers',
            'Radiographers and radiologists',
            'Paramedics',
          ].map((r, i) => (
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
        <h2 className={styles.sectionTitle}>How to apply</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Find a job with a licensed sponsor',
              desc: 'Search on UK job boards (NHS Jobs, LinkedIn, Indeed UK). Confirm the employer has a UKVI Sponsor Licence on the official government register. Only licensed sponsors can legally employ Skilled Worker visa holders.',
            },
            {
              title: 'Receive your Certificate of Sponsorship (CoS)',
              desc: 'Your employer assigns you a CoS — a unique reference number. This is not a physical certificate. You\'ll need this number to apply for your visa.',
            },
            {
              title: 'Apply online',
              desc: 'Apply on gov.uk within 3 months of receiving your CoS. Pay the visa fee (£719 for up to 3 years, £1,420 for over 3 years) plus the Immigration Health Surcharge (£1,035/year).',
            },
            {
              title: 'Biometrics and documents',
              desc: 'Book a biometric appointment at a UK Visa and Citizenship Application Services (UKVCAS) centre or a Visa Application Centre in your country. Submit documents including your passport, job offer letter, salary evidence, and English language proof.',
            },
            {
              title: 'Decision and travel',
              desc: 'Most applications are decided in 3–8 weeks. You\'ll receive a visa vignette in your passport. When you arrive in the UK, collect your BRP (Biometric Residence Permit) from a Post Office.',
            },
            {
              title: 'Settle permanently after 5 years',
              desc: 'After 5 continuous years on a Skilled Worker visa, you can apply for Indefinite Leave to Remain (ILR) — permanent residency. After 1 year of ILR, you can apply for British citizenship.',
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

      {/* Recent changes */}
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Latest Updates</span>
        <h2 className={styles.sectionTitle}>Key changes 2024–2026</h2>
        <div className={styles.changeCards}>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>April 2024</div>
            <div className={styles.changeTitle}>Salary threshold raised to £38,700</div>
            <div className={styles.changeDesc}>
              The minimum salary was increased from £26,200 to £38,700 for most skilled worker roles.
              This change was made to reduce lower-wage displacement. However, shortage occupations,
              new entrants (under 26), and roles requiring a PhD still have lower thresholds. The
              NHS pay scales are exempt and use going-rate calculations instead.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024</div>
            <div className={styles.changeTitle}>Shortage Occupation List reformed to Immigration Salary List</div>
            <div className={styles.changeDesc}>
              The Shortage Occupation List was replaced by the Immigration Salary List (ISL). Jobs on
              the ISL still benefit from reduced salary thresholds. The MAC (Migration Advisory
              Committee) reviews the list regularly — healthcare and engineering roles remain prominent.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2025</div>
            <div className={styles.changeTitle}>NHS recruitment pathways unchanged and expanding</div>
            <div className={styles.changeDesc}>
              NHS England continues to actively recruit internationally in nursing, midwifery, medical,
              and allied health professions. The NHS offers a dedicated Skilled Worker sponsorship and
              relocation support packages for international recruits.
            </div>
          </div>
        </div>
      </div>

      <div className={styles.warningBox}>
        <span className={styles.alertIcon}>⚠️</span>
        <div className={styles.warningText}>
          <strong>Never pay a "job agent" to find you a UK sponsorship.</strong> Legitimate UK employers
          do not charge workers for sponsorship. If someone is selling you a Certificate of Sponsorship
          or a "guaranteed UK job" for a fee — this is a scam and the sponsorship is likely fraudulent,
          which will invalidate your visa application and could ban you from the UK.
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="skilled-worker"
        region="uk"
        title="Find a Regulated Solicitor"
      />
    </PathwayPage>
  );
}
