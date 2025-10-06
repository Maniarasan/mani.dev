import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Welcome to {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          Technical Lead | AI, Web Technologies & Cloud Architecture
        </p>
        <p style={{fontSize: '1.1rem', marginTop: '1rem', maxWidth: '700px', margin: '1rem auto 2rem'}}>
          Exploring the intersection of artificial intelligence, modern web development, 
          and scalable cloud solutions. Sharing insights, knowledge, and experiences 
          from my journey in software engineering.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/about"
            style={{marginRight: '0.75rem', marginBottom: '0.75rem'}}>
            About Me 👋
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{marginRight: '0.75rem', marginBottom: '0.75rem'}}>
            Documentation 📚
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/blog"
            style={{marginBottom: '0.75rem'}}>
            Blog ✍️
          </Link>
        </div>
        <div style={{marginTop: '2.5rem', fontSize: '1rem', opacity: 0.9}}>
          <p>
            🎓 Latest: Explore articles on{' '}
            <Link to="/docs/ai/ai-trends-2025" style={{color: '#fff', textDecoration: 'underline'}}>AI Trends 2025</Link>
            {' '}and{' '}
            <Link to="/docs/ai/getting-started-with-vector-search" style={{color: '#fff', textDecoration: 'underline'}}>Vector Search</Link>
          </p>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home`}
      description="Technical portfolio and knowledge base of Maniarasan Sivaseran - Technical Lead specializing in AI, Web Technologies, and Cloud Computing. Explore articles on machine learning, software architecture, and modern development practices.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
