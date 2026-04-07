import PathwayPage, { SolicitorSection } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';

export default function EUHumanitarian() {
  return (
    <PathwayPage
      isEU
      meta={{
        title: 'EU Humanitarian Visa — Enter Europe Legally Without Risking Your Life',
        description: 'How to get a humanitarian visa from a European embassy to claim asylum on arrival — avoiding dangerous sea and land crossings. Country-by-country guide 2025–2026.',
      }}
      breadcrumbs={[
        { href: '/pathways/eu', label: 'EU Pathways' },
        { href: '/pathways/eu/humanitarian', label: 'Humanitarian Visa' },
      ]}
      hero={{
        icon: '🤝',
        tag: 'Humanitarian · EU · Updated April 2026',
        title: 'EU <span class="eu">Humanitarian Visa</span>',
        sub: 'Several EU countries issue humanitarian visas from their embassies — allowing people in danger to travel legally to Europe and claim asylum on arrival. This is the safest possible route: no boats, no smugglers, no risk of death. You arrive on a plane with a valid document and apply for asylum at the airport.',
      }}
      facts={[
        { label: 'Apply at', value: 'EU Embassy in your country', color: 'Blue' },
        { label: 'Processing', value: 'Weeks to months', color: 'Warning' },
        { label: 'Cost', value: 'Free or low cost', color: 'Green' },
        { label: 'Travel method', value: 'Legal flight', color: 'Green' },
      ]}
      sidebar={
        <>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Countries Issuing Humanitarian Visas</div>
            {[
              ['Portugal', 'Most active — clear process'],
              ['Spain', 'Active — apply at consulate'],
              ['Italy', 'Available — humanitarian grounds'],
              ['France', 'Available — laissez-passer'],
              ['Belgium', 'Limited humanitarian cases'],
              ['Germany', 'Limited — humanitarian entry'],
            ].map(([l, v]) => (
              <div key={l} className={styles.factRow}>
                <span className={styles.factLabel}>{l}</span>
                <span className={styles.factVal} style={{ fontSize: '0.72rem' }}>{v}</span>
              </div>
            ))}
          </div>
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>Official Links</div>
            {[
              ['Portugal SEF/AIMA humanitarian', 'https://aima.gov.pt/en'],
              ['Spain humanitarian visa', 'https://www.exteriores.gob.es/en/'],
              ['UNHCR embassy referrals', 'https://www.unhcr.org/get-help'],
              ['EU Schengen Visa Code Art.25', 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32009R0810'],
              ['ECRE humanitarian admission', 'https://ecre.org/legal-pathways/'],
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
        <span className={styles.alertIcon}>🤝</span>
        <p className={styles.alertText}>
          <strong>You can arrive in Europe without crossing the sea.</strong> Article 25 of the EU
          Schengen Visa Code allows EU member states to issue visas on humanitarian grounds. Portugal
          has a well-documented process. Spain, Italy, and France have also used this pathway.
          Contact the nearest embassy and explain your situation clearly — this route exists precisely
          for people in danger.
        </p>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Legal Basis</span>
        <h2 className={styles.sectionTitle}>What makes this legal?</h2>
        <ul className={styles.reqList}>
          {[
            'Article 25 of the EU Schengen Visa Code (Regulation 810/2009) allows member states to issue visas with limited territorial validity on humanitarian grounds, for reasons of national interest, or international obligations.',
            'This is a discretionary power — the EU country decides whether to issue it. But you can formally request it.',
            'Once in the EU country, you make your asylum claim and are protected under EU asylum law.',
            'The EU Parliament has repeatedly called for expanded use of humanitarian visas to prevent deaths at sea.',
            'UNHCR can refer you to an embassy and support your humanitarian visa request.',
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
        <h2 className={styles.sectionTitle}>How to request a humanitarian visa</h2>
        <div className={styles.steps}>
          {[
            {
              title: 'Register with UNHCR',
              desc: 'Register with UNHCR in your current country. UNHCR can write a letter of support for your humanitarian visa request and in some cases directly refer you to an embassy. This strengthens your application significantly.',
            },
            {
              title: 'Identify which EU country\'s embassy to contact',
              desc: 'Look for EU country embassies or consulates in your current country. Portugal and Spain are the most receptive. Find the closest embassy and check if they process humanitarian visa requests.',
            },
            {
              title: 'Write a detailed personal statement',
              desc: 'Write a clear, honest account of why you are in danger, why you cannot stay in your current country, and why you cannot return home. Include specific threats, dates, incidents. Be as detailed as possible. This is your most important document.',
            },
            {
              title: 'Submit your request at the embassy',
              desc: 'Go to the embassy in person or submit by post where allowed. Bring your personal statement, any identity documents you have, UNHCR registration card, evidence of threats (photos, police reports, medical records, news articles), and photos.',
            },
            {
              title: 'Embassy assessment',
              desc: 'The consular officer assesses your request. Processing time varies from days to months. They may ask for additional information or an interview. Be honest and cooperative.',
            },
            {
              title: 'Travel and claim asylum on arrival',
              desc: 'If a humanitarian visa is issued, you can travel to that EU country legally on a commercial flight. On arrival at the airport or border, tell the border officer you wish to claim asylum. You are now inside the EU asylum system — legally, safely.',
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
        <span className={styles.sectionLabel}>Country Spotlight — Portugal</span>
        <h2 className={styles.sectionTitle}>Portugal's humanitarian visa process</h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '1rem' }}>
          Portugal has the most transparent humanitarian visa process in the EU. The Portuguese
          Immigration and Border Service (AIMA, formerly SEF) processes humanitarian visa requests
          under Article 122 of the Portuguese Aliens Act.
        </p>
        <ul className={styles.reqList}>
          {[
            'Apply at the Portuguese embassy or consulate in your current country.',
            'Submit a request citing humanitarian reasons — persecution, serious harm, medical emergency.',
            'UNHCR support letter significantly helps.',
            'If you have family in Portugal, include this in your request.',
            'If approved, you receive a visa to enter Portugal and make your asylum claim there.',
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
        <h2 className={styles.sectionTitle}>Developments 2024–2026</h2>
        <div className={styles.changeCards}>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2024</div>
            <div className={styles.changeTitle}>EU Parliament resolution calling for mandatory humanitarian corridors</div>
            <div className={styles.changeDesc}>
              The European Parliament passed a resolution calling on EU member states to create
              mandatory humanitarian visa pathways to prevent deaths in the Mediterranean. While not
              yet binding law, this signals growing political will for expanded humanitarian visas.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2023–2024</div>
            <div className={styles.changeTitle}>Humanitarian corridors — Italy, France, Belgium</div>
            <div className={styles.changeDesc}>
              Community organisations in Italy (Sant'Egidio), France, and Belgium have established
              "humanitarian corridors" in partnership with governments — bringing refugees from
              Lebanon, Ethiopia, and Libya directly to Europe on legal flights. Over 6,000 people
              have arrived safely through these corridors since 2016.
            </div>
          </div>
          <div className={styles.changeCard}>
            <div className={styles.changeDate}>2025</div>
            <div className={styles.changeTitle}>Spain expanded its consular capacity in West Africa</div>
            <div className={styles.changeDesc}>
              Spain opened additional consular services in Senegal, Mauritania, and Morocco to process
              humanitarian and work visa applications — a direct response to the dangerous Atlantic
              route to the Canary Islands. This creates more opportunities for legal entry.
            </div>
          </div>
        </div>
      </div>

      <div className={styles.warningBox}>
        <span className={styles.alertIcon}>⚠️</span>
        <div className={styles.warningText}>
          <strong>Compare the risks honestly.</strong> The Central Mediterranean route has a 1-in-45
          death rate. The Atlantic to Canary Islands route is the world's fastest-growing killer route.
          A humanitarian visa application takes time — but it arrives in Europe alive, documented, and
          with full legal protection. The dangerous route might be faster. It might also be your last journey.
        </div>
      </div>

      <SolicitorSection
        caseTypeSlug="humanitarian"
        region="eu"
        title="Get Help Requesting a Humanitarian Visa"
      />
    </PathwayPage>
  );
}
