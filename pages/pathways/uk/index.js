import Head from 'next/head';
import Link from 'next/link';
import { TopBar } from '../../../components/PathwayPage';
import styles from '../../../styles/Pathway.module.css';
import { getPageTranslations } from '../../../lib/i18n';

const CHIPS = {
  '/pathways/uk/asylum':       [{ label: 'Free to apply', color: 'green' }, { label: '12–18 months', color: '' }, { label: 'Low risk', color: 'green' }],
  '/pathways/uk/skilled-worker': [{ label: 'Job offer needed', color: '' }, { label: '3–8 weeks', color: 'green' }, { label: 'Very low risk', color: 'green' }],
  '/pathways/uk/student':      [{ label: 'University offer needed', color: '' }, { label: '3–6 weeks', color: 'green' }, { label: 'Very low risk', color: 'green' }],
  '/pathways/uk/family':       [{ label: 'Family sponsor needed', color: '' }, { label: '3–12 months', color: '' }, { label: 'Low risk', color: 'green' }],
  '/pathways/uk/resettlement': [{ label: 'Completely free', color: 'green' }, { label: '6–24 months', color: '' }, { label: 'Very low risk', color: 'green' }],
};

export default function UKPathwaysIndex({ pt }) {
  return (
    <>
      <Head>
        <title>{pt.meta.title} | SafePassage</title>
        <meta name="description" content={pt.meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.page}>
        <TopBar breadcrumbs={[{ href: '/pathways/uk', label: 'UK Pathways' }]} />

        <div className={styles.hubHero}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <span className={styles.heroTag}>{pt.hero.tag}</span>
            <h1 className={styles.hubTitle} dangerouslySetInnerHTML={{ __html: pt.hero.title }} />
            <p className={styles.hubSub}>{pt.hero.sub}</p>
          </div>
        </div>

        <div className={styles.hubGrid}>
          {pt.cards.map(card => {
            const chips = CHIPS[card.href] || [];
            return (
              <Link key={card.href} href={card.href} className={styles.hubCard}>
                <span className={styles.hubCardIcon}>{card.icon}</span>
                <span className={styles.hubCardTag}>{card.tag}</span>
                <div className={styles.hubCardTitle}>{card.name}</div>
                <p className={styles.hubCardDesc}>{card.desc}</p>
                <div className={styles.hubCardMeta}>
                  {chips.map((c, i) => (
                    <span key={i} className={`${styles.hubChip} ${c.color ? styles[c.color] : ''}`}>{c.label}</span>
                  ))}
                </div>
              </Link>
            );
          })}
          <Link href="/pathways/eu" className={styles.hubCard} style={{ borderStyle: 'dashed' }}>
            <span className={styles.hubCardIcon}>🇪🇺</span>
            <span className={`${styles.hubCardTag} ${styles.hubCardTagEU}`}>Europe</span>
            <div className={styles.hubCardTitle}>EU &amp; European Pathways</div>
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

export async function getServerSideProps({ locale }) {
  const pt = getPageTranslations(locale, 'uk-hub');
  return { props: { pt } };
}
