import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';

export default function EUBlueCard() {
  return (
    <PathwayPage
      isEU
      meta={{
        title: 'EU Blue Card 2025–2026 — Work in Europe as a Skilled Professional',
        description: 'Full guide to the EU Blue Card — work permit for highly qualified workers in Germany, France, Netherlands, and all EU countries. New 2023 Directive rules.',
      }}
      breadcrumbs={[
        { href: '/pathways/eu', label: 'EU Pathways' },
        { href: '/pathways/eu/blue-card', label: 'EU Blue Card' },
      ]}
      hero={{
        icon: '💼',
        tag: 'Work-Based · EU · Updated April 2026',
        title: 'EU <span class="eu">Blue Card</span>',
        sub: 'The EU Blue Card is a fast-track work and residence permit for highly qualified professionals from outside the EU. It is valid in most EU countries, gives you a clear path to permanent residence, and lets you bring your family immediately.',
      }}
      facts={[
        { label: 'Salary threshold', value: '1.0× national avg salary', color: 'Blue' },
        { label: 'Processing', value: '30–90 days', color: 'Green' },
        { label: 'Family members', value: 'Immediate join', color: 'Green' },
        { label: 'EU mobility', value: 'After 12 months', color: 'Blue' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Salary Thresholds by Country</div>
            {[
              ['Germany', '€45,300/year (2025)'],
              ['France', '€53,836/year'],
              ['Netherlands', '€63,000/year'],
              ['Belgium', '€52,000/year'],
              ['Spain', '€40,078/year'],
              ['Poland', '~€24,000/year'],
              ['Portugal', '~€21,600/year'],
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
              ['EU Blue Card info', 'https://ec.europa.eu/immigration/blue-card'],
              ['Germany EU Blue Card', 'https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card'],
              ['Germany job search', 'https://www.arbeitsagentur.de/en/'],
              ['France skilled worker', 'https://www.welcometofrance.com/en'],
              ['Netherlands highly skilled', 'https://ind.nl/en/work/working_in_the_Netherlands/Pages/Highly-skilled-migrant.aspx'],
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
        <span className={styles.alertIcon}>💼</span>
        <p className={styles.alertText}>
          <strong>Europe actively needs skilled workers.</strong> Germany alone has over 1.3 million
          unfilled vacancies in engineering, IT, healthcare, and skilled trades. The EU Blue Card
          was specifically designed to attract talent from outside Europe — the process is streamlined,
          fast, and comes with excellent rights including family reunification from day one.
        </p>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Eligibility</span>
        <h2 className={styles.sectionTitle}>Who can apply for an EU Blue Card?</h2>
        <ul className={styles.reqList}>
          {[
            'You have a higher education qualification (university degree) of at least 3 years — or 5 years of equivalent professional experience (under the reformed 2023 Directive).',
            'You have a job offer or employment contract in an EU country for at least 6 months.',
            'The salary meets or exceeds the national threshold (typically 1.0× the average annual gross salary of the host country).',
            'For shortage occupations: lower salary thresholds apply (0.8× national average in some countries).',
            'You are a non-EU national (EU citizens do not need a Blue Card).',
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
        <h2 className={styles.sectionTitle}>How to get an EU Blue Card</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Find a job in your target EU country',
              desc: 'Search for jobs on EURES (the European job portal), national job boards (Arbeitsagentur for Germany, France Travail for France), LinkedIn, and sector-specific platforms. Confirm the employer is willing to sponsor your visa.',
            },
            {
              title: 'Verify your qualifications (if required)',
              desc: 'Germany requires foreign degrees to be recognised through anabin.de or KMK. Some countries require your degree to be evaluated by a national recognition body. Start this process early — it can take 2–3 months.',
            },
            {
              title: 'Apply at the embassy or online',
              desc: 'Apply at the EU country\'s consulate or embassy in your home country, or — for Germany — apply online through the Make it in Germany portal. Submit your employment contract, degree certificates, and passport.',
            },
            {
              title: 'Processing — typically 30–90 days',
              desc: 'Under the reformed Directive, processing must be completed within 30–90 days. Once approved, you receive a Blue Card residence permit valid for the contract period plus 3 months (minimum 24 months).',
            },
            {
              title: 'Bring your family immediately',
              desc: 'Under the reformed EU Blue Card Directive (2021), family members (spouse/partner and children) can join you immediately — without the usual waiting period. Your family members also have the right to work.',
            },
            {
              title: 'Gain permanent residence after 2–3 years',
              desc: 'After 2 years of Blue Card residence (or 1 year in shortage occupations), you can apply for an EU long-term residence permit — permanent status in that EU country. After 12 months, you can also move to another EU country on your Blue Card.',
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
        <span className={styles.sectionLabel}>In-demand sectors</span>
        <h2 className={styles.sectionTitle}>Roles with the most opportunities (2025–2026)</h2>
        <ul className={styles.reqList}>
          {[
            'Software engineers, data scientists, and AI specialists',
            'Medical doctors, nurses, and specialist health professionals',
            'Mechanical and electrical engineers',
            'Civil and structural engineers',
            'IT system administrators and cybersecurity professionals',
            'Pharmacists and laboratory scientists',
            'Teachers — especially STEM and special needs',
            'Architects and urban planners',
            'Financial analysts and auditors',
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
        <h2 className={styles.sectionTitle}>Reformed EU Blue Card 2023–2026</h2>
        <div className={styles.changeCards}>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2023 — Reformed Directive 2021/1883</div>
            <div className={styles.changeTitle}>Lower salary thresholds and professional experience now accepted</div>
            <div className={styles.changeDesc}>
              The reformed EU Blue Card Directive lowered salary thresholds, accepted 5 years of
              equivalent professional experience instead of a formal degree, expanded family
              reunification rights, and created a fast-track for shortage occupations. All EU
              countries were required to implement by November 2023.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024</div>
            <div className={styles.changeTitle}>Germany's Opportunities Residence Act — new routes added</div>
            <div className={styles.changeDesc}>
              Germany introduced the Chancenaufenthaltsrecht (Opportunities Residence) Act, creating
              additional pathways including a job-seeker visa, vocational training visa, and fast-track
              procedures. Germany is the easiest EU country for skilled worker immigration in 2025.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2025</div>
            <div className={styles.changeTitle}>EU talent partnerships with Africa and Asia expanding</div>
            <div className={styles.changeDesc}>
              EU Talent Partnerships with Morocco, Tunisia, Egypt, Pakistan, and Bangladesh are
              expanding, creating more structured legal routes for workers in those countries to
              access Blue Card and other work permits in EU countries.
            </div>
          </div>
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="skilled-worker"
        region="eu"
        title="Get Help with Your EU Blue Card Application"
      />
    </PathwayPage>
  );
}
