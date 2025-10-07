import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';

export function RecentBlogPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch blog metadata - this will be populated from blog files
    const blogPosts = [
      {
        title: 'Zuper\'s Roofing Digital Transformation',
        permalink: '/blog/zuper-roofing-digital-transformation',
        description: 'A comprehensive look at how Zuper revolutionized roofing operations through digital transformation',
        date: '2025-10-07T07:51:00+05:30'
      },
      {
        title: 'Beginning My Blogging Journey',
        permalink: '/blog/blogging-journey',
        description: 'Embarking on a new adventure to share knowledge, experiences, and insights through writing',
        date: '2025-10-07T00:26:00+05:30'
      }
    ];

    setPosts(blogPosts.slice(0, 2));
  }, []);

  return (
    <section className="margin-top--xl margin-bottom--xl">
      <div className="container">
        <Heading as="h2" style={{textAlign: 'center', marginBottom: '2rem'}}>
          Latest Blog Posts ✍️
        </Heading>
        <div className="row">
          {posts.map((post, idx) => (
            <div key={idx} className="col col--6">
              <div className="card margin-bottom--md" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <div className="card__header">
                  <Heading as="h3">
                    <Link to={useBaseUrl(post.permalink)}>{post.title}</Link>
                  </Heading>
                </div>
                <div className="card__body" style={{flex: 1}}>
                  {post.description}
                  <p style={{fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '1rem'}}>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </time>
                  </p>
                </div>
                <div className="card__footer">
                  <Link className="button button--secondary button--block" to={useBaseUrl(post.permalink)}>
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RecentDocs() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    // Fetch docs metadata - sorted by most recently added/changed
    const docArticles = [
      {
        title: 'Node.js Event Loop and Non-Blocking I/O',
        permalink: '/docs/nodejs/event-loop',
        description: 'Understanding the Node.js event loop and non-blocking I/O model for building scalable applications',
        date: '2025-10-07T08:08:00+05:30'
      },
      {
        title: 'AI Trends 2025',
        permalink: '/docs/ai/ai-trends-2025',
        description: 'Exploring the latest trends in artificial intelligence and machine learning for 2025',
        date: '2025-10-07T00:43:00+05:30'
      }
    ];

    setDocs(docArticles.slice(0, 2));
  }, []);

  return (
    <section className="margin-top--xl margin-bottom--xl" style={{backgroundColor: 'var(--ifm-color-emphasis-100)', padding: '3rem 0'}}>
      <div className="container">
        <Heading as="h2" style={{textAlign: 'center', marginBottom: '2rem'}}>
          Latest Knowledge Base Articles 📚
        </Heading>
        <div className="row">
          {docs.map((doc, idx) => (
            <div key={idx} className="col col--6">
              <div className="card margin-bottom--md" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <div className="card__header">
                  <Heading as="h3">
                    <Link to={useBaseUrl(doc.permalink)}>{doc.title}</Link>
                  </Heading>
                </div>
                <div className="card__body" style={{flex: 1}}>
                  {doc.description}
                  <p style={{fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-600)', marginTop: '1rem'}}>
                    <time dateTime={doc.date}>
                      {new Date(doc.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </time>
                  </p>
                </div>
                <div className="card__footer">
                  <Link className="button button--secondary button--block" to={useBaseUrl(doc.permalink)}>
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
