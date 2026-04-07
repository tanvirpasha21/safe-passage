import Head from 'next/head';
import Link from 'next/link';
import { TopBar } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';

const pathways = [
  {
    href: '/pathways/eu/asylum',
    icon: '🏛️',
    tag: 'Protection-Based',
    title: 'Asylum in the EU',
    desc: 'Claim asylum in any EU member state under the Common European Asylum System (CEAS). The EU Pact on Migration 2024 has introduced significant improvements.',
    chips: [{ label: 'Free to apply', color: 'green' }, { label: '6–18 months', color: '' }, { label: 'Low risk', color: 'green' }],
  },
  {
    href: '/pathways/eu/resettlement',
    icon: '✈️',
    tag: 'Humanitarian',
    title: 'EU Resettlement',
    desc: 'The EU Union Resettlement Framework brings vulnerable refugees safely to Europe through UNHCR referral — completely free, on a plane.',
    chips: [{ label: 'Completely free', color: 'green' }, { label: '1–2 years', color: '' }, { label: 'Very low risk', color: 'green' }],
  },
  {
    href: '/pathways/eu/blue-card',
    icon: '💼',
    tag: 'Work-Based',
    title: 'EU Blue Card',
    desc: 'The EU Blue Card is a work permit for highly qualified professionals wanting to work in Germany, France, Netherlands, and other EU countries.',
    chips: [{ label: 'Job offer needed', color: '' }, { label: '1–3 months', color: 'green' }, { label: 'Very low risk', color: 'green' }],
  },
  {
    href: '/pathways/eu/student',
    icon: '🎓',
    tag: 'Education-Based',
    title: 'Study in the EU',
    desc: 'Europe has world-class universities — many with free or low-cost tuition for international students. Erasmus+ and DAAD scholarships cover everything.',
    chips: [{ label: 'Many free courses', color: 'green' }, { label: '1–3 months', color: 'green' }, { label: 'Very low risk', color: 'green' }],
  },
  {
    href: '/pathways/eu/family',
    icon: '👨‍👩‍👧',
    tag: 'Family-Based',
    title: 'EU Family Reunification',
    desc: 'If you have a family member with legal status in an EU country, you may join them through the EU Family Reunification Directive.',
    chips: [{ label: 'Sponsor needed', color: '' }, { label: '3–12 months', color: '' }, { label: 'Low risk', color: 'green' }],
  },
  {
    href: '/pathways/eu/humanitarian',
    icon: '🤝',
    tag: 'Humanitarian',
    title: 'Humanitarian Visa',
    desc: 'Some EU countries issue humanitarian visas at their embassies, letting you enter legally to claim asylum on arrival — no dangerous sea crossing needed.',
    chips: [{ label: 'Apply at embassy', color: '' }, { label: 'Weeks–months', color: 'green' }, { label: 'Low risk', color: 'green' }],
  },
];

export default function EUPathwaysIndex() {
  return (
    <>
      <Head>
        <title>EU Legal Pathways | SafePassage</title>
        <meta name="description" content="All legal pathways to Europe — asylum, EU Blue Card, student, family reunification, resettlement and humanitarian visas. Full 2025–2026 updated information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        <TopBar breadcrumbs={[{ href: '/pathways/eu', label: 'EU Pathways' }]} isEU />

        <div className={styles.hubHero}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span className={`${styles.heroTag} ${styles.heroTagEU}`}>Legal Routes · EU · Updated 2025–2026</span>
            <h1 className={styles.hubTitle}>
              Legal Pathways <span className="eu" style={{ color: '#4a9eff' }}>to Europe</span>
            </h1>
            <p className={styles.hubSub}>
              There are six well-established legal routes to live in European Union countries —
              including Germany, France, Italy, Spain, the Netherlands, Belgium, and Sweden.
              Every one of them is safer, cheaper, and more permanent than any illegal route.
            </p>
            <div className={styles.alertBox} style={{ textAlign: 'left', maxWidth: 660, margin: '0 auto' }}>
              <span className={styles.alertIcon}>✅</span>
              <p className={styles.alertText}>
                <strong>The EU Pact on Migration (2024) introduced new protections.</strong> The
                reformed Common European Asylum System brings faster decisions, better reception
                conditions, and stronger rights for applicants across all 27 EU member states.
                Legal pathways now have more certainty than at any time in the past decade.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.hubGrid}>
          {pathways.map(p => (
            <Link key={p.href} href={p.href} className={`${styles.hubCard} ${styles.hubCardEU}`}>
              <span className={styles.hubCardIcon}>{p.icon}</span>
              <span className={`${styles.hubCardTag} ${styles.hubCardTagEU}`}>{p.tag}</span>
              <div className={styles.hubCardTitle}>{p.title}</div>
              <p className={styles.hubCardDesc}>{p.desc}</p>
              <div className={styles.hubCardMeta}>
                {p.chips.map((c, i) => (
                  <span key={i} className={`${styles.hubChip} ${c.color ? styles[c.color] : ''}`}>{c.label}</span>
                ))}
              </div>
            </Link>
          ))}
          <Link href="/pathways/uk" className={styles.hubCard} style={{ borderStyle: 'dashed' }}>
            <span className={styles.hubCardIcon}>🇬🇧</span>
            <span className={styles.hubCardTag}>United Kingdom</span>
            <div className={styles.hubCardTitle}>UK Pathways</div>
            <p className={styles.hubCardDesc}>Explore legal pathways specifically to the United Kingdom — asylum, skilled worker, student, family, and resettlement.</p>
            <div className={styles.hubCardMeta}>
              <span className={`${styles.hubChip} ${styles.green}`}>5 pathways</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
