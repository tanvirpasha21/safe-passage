import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';

export default function EUStudent() {
  return (
    <PathwayPage
      isEU
      meta={{
        title: 'Study in the EU — Student Visa Guide 2025–2026',
        description: 'How to get a student visa to study in Germany, France, Netherlands, Spain, or any EU country. Scholarships, DAAD, Erasmus+, free tuition options.',
      }}
      breadcrumbs={[
        { href: '/pathways/eu', label: 'EU Pathways' },
        { href: '/pathways/eu/student', label: 'Study in EU' },
      ]}
      hero={{
        icon: '🎓',
        tag: 'Education-Based · EU · Updated April 2026',
        title: 'Study <span class="eu">in Europe</span>',
        sub: 'European universities offer world-class education — and many countries charge little or no tuition even to international students. Germany has tuition-free public universities. Norway, Iceland, and Austria offer very low fees. With a student visa, you live and work legally in Europe and can transition to long-term residence.',
      }}
      facts={[
        { label: 'Tuition (Germany)', value: 'Free at public universities', color: 'Green' },
        { label: 'Processing time', value: '4–12 weeks', color: 'Green' },
        { label: 'Part-time work', value: '20 hrs/week', color: 'Green' },
        { label: 'Post-study stay', value: '12–18 months', color: 'Blue' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Top Destinations for Study</div>
            {[
              ['Germany', 'Free tuition at most public unis'],
              ['France', '~€3,770/yr for non-EU'],
              ['Netherlands', '€2,530–€20,000/yr'],
              ['Spain', '€1,000–€3,500/yr'],
              ['Belgium', '€835–€4,175/yr'],
              ['Portugal', '€697–€7,000/yr'],
            ].map(([l, v]) => (
              <div key={l} className={styles.factRow}>
                <span className={styles.factLabel}>{l}</span>
                <span className={styles.factVal} style={{ fontSize: '0.72rem' }}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Scholarships</div>
            {[
              ['DAAD (Germany)', 'https://www.daad.de/en/'],
              ['Erasmus+ (All EU)', 'https://erasmus-plus.ec.europa.eu/'],
              ['Campus France', 'https://www.campusfrance.org/en'],
              ['Nuffic (Netherlands)', 'https://www.nuffic.nl/en'],
              ['Study in Germany', 'https://www.study-in-germany.de/en/'],
              ['Eiffel Scholarship (FR)', 'https://www.campusfrance.org/en/eiffel'],
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
        <span className={styles.alertIcon}>🎓</span>
        <p className={styles.alertText}>
          <strong>Germany's universities are free — and world-ranked.</strong> Munich, Heidelberg,
          Berlin's TU, Frankfurt — public universities charge only a small semester fee (€100–€350).
          DAAD scholarships cover living costs. This is one of the most accessible and transformative
          legal pathways that exists. A European degree opens doors across the world.
        </p>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Eligibility</span>
        <h2 className={styles.sectionTitle}>Who can get an EU student visa?</h2>
        <ul className={styles.reqList}>
          {[
            'You have been accepted to an accredited university, college, or language school in an EU country.',
            'You can show you have enough funds to cover fees and living costs (approximately €850–€1,200/month).',
            'You meet the language requirements of your course (English, German, French, Spanish).',
            'Your qualification is recognised as entry level for the course (school leaving certificate or prior degree).',
            'You intend to study — and ideally have a plan for what you will do after.',
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
        <h2 className={styles.sectionTitle}>How to get a EU student visa</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Apply for scholarships first',
              desc: 'DAAD (Germany) offers hundreds of scholarship programmes covering full living costs. Erasmus+ Mundus offers funded joint degrees. Campus France helps with French university applications. Apply for scholarships before worrying about fees.',
            },
            {
              title: 'Apply to universities',
              desc: 'Use uni-assist.de for German universities. Apply directly to French universities via Études en France. Most EU universities have English-language Master\'s degrees. Bachelor\'s often require the local language. Start 12 months before your intended start date.',
            },
            {
              title: 'Receive your acceptance letter',
              desc: 'Once accepted, you\'ll receive a formal acceptance letter (Zulassungsbescheid in Germany, Lettre d\'admission in France). This is your key document for the visa.',
            },
            {
              title: 'Apply for a national visa (Type D)',
              desc: 'Apply at the embassy or consulate of your destination EU country in your home country. You\'ll need your acceptance letter, passport, proof of funds (blocked account in Germany — Sperrkonto, €11,208 for 2025), health insurance, and biometric photos.',
            },
            {
              title: 'Arrive and register',
              desc: 'On arrival, register at the local residents\' registration office (Einwohnermeldeamt in Germany) and at your university. Convert your entry visa to a residence permit at the local immigration authority (Ausländerbehörde).',
            },
            {
              title: 'Stay after graduation — post-study visa',
              desc: 'After graduation, you can apply to stay for 12–18 months to look for work (job-seeker visa). Once you find a job matching your qualification, switch to an EU Blue Card or national work permit and stay permanently.',
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
        <h2 className={styles.sectionTitle}>Changes to EU student routes 2024–2026</h2>
        <div className={styles.changeCards}>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024</div>
            <div className={styles.changeTitle}>Germany blocked account requirement updated to €11,208 (2025)</div>
            <div className={styles.changeDesc}>
              The required blocked account (Sperrkonto) amount for Germany was updated to €11,208 for
              2025 — covering 12 months at €934/month. Many banks (Deutsche Bank, Fintiba, Coracle)
              offer easy online blocked account opening from abroad.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024</div>
            <div className={styles.changeTitle}>France simplified student visa process via Campus France</div>
            <div className={styles.changeDesc}>
              France streamlined the student visa application process through the Campus France platform,
              with faster processing for pre-cleared applicants. France is actively growing international
              student enrolment with English-language programmes increasing significantly.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2023 Directive</div>
            <div className={styles.changeTitle}>EU Students and Researchers Directive — 18-month job-seeker visa</div>
            <div className={styles.changeDesc}>
              The recast EU Directive on students and researchers guarantees that international graduates
              can stay up to 18 months after graduation to look for work or start a business — in any
              EU country, not just where they studied.
            </div>
          </div>
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="student"
        region="eu"
        title="Get Help with Your Student Visa Application"
      />
    </PathwayPage>
  );
}
