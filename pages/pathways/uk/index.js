import Head from 'next/head';
import Link from 'next/link';
import { TopBar } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';

const pathways = [
  {
    href: '/pathways/uk/asylum',
    icon: '🏛️',
    tag: 'Protection-Based',
    title: 'Asylum in the UK',
    desc: 'If you are fleeing persecution, war or serious harm, you have the right to claim asylum in the UK under the 1951 Refugee Convention.',
    chips: [{ label: 'Free to apply', color: 'green' }, { label: '12–18 months', color: '' }, { label: 'Low risk', color: 'green' }],
  },
  {
    href: '/pathways/uk/skilled-worker',
    icon: '💼',
    tag: 'Work-Based',
    title: 'Skilled Worker Visa',
    desc: 'The UK actively recruits skilled workers in healthcare, technology, engineering, construction and more through its points-based system.',
    chips: [{ label: 'Job offer needed', color: '' }, { label: '3–8 weeks', color: 'green' }, { label: 'Very low risk', color: 'green' }],
  },
  {
    href: '/pathways/uk/student',
    icon: '🎓',
    tag: 'Education-Based',
    title: 'Student Visa',
    desc: 'Study at a UK university or college with a full legal visa. The Graduate Route lets you stay up to 3 years after graduation to work.',
    chips: [{ label: 'University offer needed', color: '' }, { label: '3–6 weeks', color: 'green' }, { label: 'Very low risk', color: 'green' }],
  },
  {
    href: '/pathways/uk/family',
    icon: '👨‍👩‍👧',
    tag: 'Family-Based',
    title: 'Family Visa',
    desc: 'Join a spouse, partner, parent or child who is a British citizen or holds settled status in the UK through legal family reunification.',
    chips: [{ label: 'Family sponsor needed', color: '' }, { label: '3–12 months', color: '' }, { label: 'Low risk', color: 'green' }],
  },
  {
    href: '/pathways/uk/resettlement',
    icon: '✈️',
    tag: 'Humanitarian',
    title: 'Resettlement Schemes',
    desc: 'The UK runs official resettlement programmes — including UKRS, Afghan ACRS/ARAP, and Community Sponsorship — that bring people safely and legally to the UK.',
    chips: [{ label: 'Completely free', color: 'green' }, { label: '6–24 months', color: '' }, { label: 'Very low risk', color: 'green' }],
  },
];

export default function UKPathwaysIndex() {
  return (
    <>
      <Head>
        <title>UK Legal Pathways | SafePassage</title>
        <meta name="description" content="All legal pathways to come to the UK — asylum, skilled worker, student, family, and resettlement schemes. Full 2025–2026 updated information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        <TopBar breadcrumbs={[{ href: '/pathways/uk', label: 'UK Pathways' }]} />

        <div className={styles.hubHero}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span className={styles.heroTag}>Legal Routes · Updated 2025–2026</span>
            <h1 className={styles.hubTitle}>
              Legal Pathways <em>to the UK</em>
            </h1>
            <p className={styles.hubSub}>
              There are five well-established legal routes to come to the United Kingdom.
              Each one is safe, documented, and gives you full legal rights on arrival.
              Choose the route that fits your situation.
            </p>
            <div className={styles.alertBox} style={{ textAlign: 'left', maxWidth: 660, margin: '0 auto' }}>
              <span className={styles.alertIcon}>✅</span>
              <p className={styles.alertText}>
                <strong>Legal routes protect you and your future.</strong> Arriving legally means you have the
                right to work, access healthcare, bring family later, and build a settled life. Illegal entry
                risks detention, deportation, and a permanent bar on future visa applications.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.hubGrid}>
          {pathways.map(p => (
            <Link key={p.href} href={p.href} className={styles.hubCard}>
              <span className={styles.hubCardIcon}>{p.icon}</span>
              <span className={styles.hubCardTag}>{p.tag}</span>
              <div className={styles.hubCardTitle}>{p.title}</div>
              <p className={styles.hubCardDesc}>{p.desc}</p>
              <div className={styles.hubCardMeta}>
                {p.chips.map((c, i) => (
                  <span key={i} className={`${styles.hubChip} ${c.color ? styles[c.color] : ''}`}>{c.label}</span>
                ))}
              </div>
            </Link>
          ))}
          <Link href="/pathways/eu" className={styles.hubCard} style={{ borderStyle: 'dashed' }}>
            <span className={styles.hubCardIcon}>🇪🇺</span>
            <span className={`${styles.hubCardTag} ${styles.hubCardTagEU}`}>Europe</span>
            <div className={styles.hubCardTitle}>EU & European Pathways</div>
            <p className={styles.hubCardDesc}>Explore legal pathways to Germany, France, Italy, Spain, the Netherlands and other EU countries.</p>
            <div className={styles.hubCardMeta}>
              <span className={`${styles.hubChip} ${styles.blue}`}>6 pathways</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
