import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';

export default function EUFamily() {
  return (
    <PathwayPage
      isEU
      meta={{
        title: 'EU Family Reunification — Join Family in Europe (2025–2026)',
        description: 'Full guide to EU Family Reunification Directive. How to join a family member in Germany, France, Spain, Netherlands or any EU country legally.',
      }}
      breadcrumbs={[
        { href: '/pathways/eu', label: 'EU Pathways' },
        { href: '/pathways/eu/family', label: 'Family Reunification' },
      ]}
      hero={{
        icon: '👨‍👩‍👧',
        tag: 'Family-Based · EU · Updated April 2026',
        title: 'EU <span class="eu">Family Reunification</span>',
        sub: 'If a close family member — a spouse, civil partner, or dependent child — has legal residence in an EU country, you have the right to join them under the EU Family Reunification Directive. This is a strong, well-established legal right that leads to your own independent residence permit.',
      }}
      facts={[
        { label: 'Legal basis', value: 'Directive 2003/86/EC', color: 'Blue' },
        { label: 'Processing', value: '3–12 months', color: 'Warning' },
        { label: 'Right to work', value: 'Yes — same as sponsor', color: 'Green' },
        { label: 'Own residence permit', value: 'After 4–5 years', color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Eligible Family Members</div>
            {[
              ['Spouse / Civil partner', '✓ Always eligible'],
              ['Children under 18', '✓ Always eligible'],
              ['Registered partner', '✓ Many EU countries'],
              ['Dependent parents', '⚠ Some countries only'],
              ['Adult children', '⚠ Must be dependent'],
              ['Unmarried partner', '⚠ Some countries only'],
            ].map(([l, v]) => (
              <div key={l} className={styles.factRow}>
                <span className={styles.factLabel} style={{ fontSize: '0.78rem' }}>{l}</span>
                <span className={styles.factVal} style={{ fontSize: '0.75rem', color: v.startsWith('✓') ? 'var(--safe)' : 'var(--warning)' }}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official Links by Country</div>
            {[
              ['Germany — family visa', 'https://www.auswaertiges-amt.de/en/visa-service/family-reunification'],
              ['France — family reunification', 'https://www.immigration.interieur.gouv.fr/en/Immigration/Family'],
              ['Netherlands — MVV family', 'https://ind.nl/en/family'],
              ['Spain — family reunification', 'https://www.inclusion.gob.es/web/migraciones/reagrupacion-familiar'],
              ['EU Directive 2003/86', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32003L0086'],
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
        <span className={styles.alertIcon}>❤️</span>
        <p className={styles.alertText}>
          <strong>Family reunification is a fundamental EU right.</strong> The European Court of Human
          Rights has repeatedly upheld the right to family life under Article 8 ECHR. Genuine family
          members of legally resident persons in the EU have a strong legal basis to join them. Once
          reunited, you have your own independent residence permit and the right to work.
        </p>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Who can be your sponsor</span>
        <h2 className={styles.sectionTitle}>Who in the EU can bring you</h2>
        <ul className={styles.reqList}>
          {[
            'An EU citizen (through free movement rights, not the Directive — faster and easier).',
            'A third-country national with at least 1 year of legal residence and a reasonable prospect of permanent residency.',
            'A refugee or person with subsidiary protection (special rules — see below).',
            'A person with EU long-term resident status.',
          ].map((r, i) => (
            <li key={i} className={styles.reqItem}>
              <span className={styles.reqCheck}>✓</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Refugee family reunion</span>
        <h2 className={styles.sectionTitle}>If your family member is a refugee in the EU</h2>
        <div className={styles.alertBox}>
          <span className={styles.alertIcon}>❤️</span>
          <p className={styles.alertText}>
            <strong>Refugees: no integration conditions, no waiting period.</strong> If your family
            member has refugee status or subsidiary protection in an EU country, the Directive gives
            you stronger rights. There is no waiting period before they can apply for you, and EU
            countries cannot impose income or integration conditions on refugee sponsors.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Step by Step</span>
        <h2 className={styles.sectionTitle}>How to apply for family reunification</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Your family member in the EU applies',
              desc: 'The family member (sponsor) in the EU country submits an application to the national immigration authority. In Germany this is the Ausländerbehörde, in France the préfecture, in the Netherlands the IND.',
            },
            {
              title: 'Sponsor demonstrates eligibility',
              desc: 'The sponsor typically needs to show: stable income (enough to support the family), adequate housing, and health insurance. Refugees are usually exempt from income and housing requirements.',
            },
            {
              title: 'You apply for a visa from your country',
              desc: 'Once the sponsor\'s application is approved (or simultaneously, depending on the country), you apply at the EU country\'s embassy or consulate in your home country for a family reunification visa.',
            },
            {
              title: 'Documents and interview',
              desc: 'Bring your marriage certificate, birth certificates (for children), proof of relationship, passport, and any documents about your sponsor\'s status in the EU. The interview checks the genuineness of the relationship.',
            },
            {
              title: 'Arrive and collect residence permit',
              desc: 'Your visa allows you to travel. On arrival, you register locally and receive a residence permit. This permit gives you the right to work (in most EU countries) and access to education and healthcare.',
            },
            {
              title: 'Become independent after 4–5 years',
              desc: 'After 4–5 years of residence, you can apply for an independent residence permit — no longer tied to your sponsor\'s status. You can then apply for long-term EU residence or citizenship depending on the country.',
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
        <h2 className={styles.sectionTitle}>Changes to EU family reunification 2024–2026</h2>
        <div className={styles.changeCards}>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024 — EU Pact</div>
            <div className={styles.changeTitle}>Family unity provisions strengthened</div>
            <div className={styles.changeDesc}>
              The EU Pact on Migration includes strengthened family unity provisions, particularly for
              unaccompanied minors and families separated during displacement. Processing times for
              family cases should improve as the Pact is implemented through 2026.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024</div>
            <div className={styles.changeTitle}>ECHR ruling protects family life for refused applicants</div>
            <div className={styles.changeDesc}>
              The European Court of Human Rights issued several significant rulings in 2024 reinforcing
              Article 8 (right to family life) as a check on deportation and family separation decisions.
              These rulings benefit applicants whose family reunification is refused.
            </div>
          </div>
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="family"
        region="eu"
        title="Free Legal Help for Family Reunification"
      />
    </PathwayPage>
  );
}
