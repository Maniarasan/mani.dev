import React, {useEffect, useState} from 'react';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

export default function RecentContent() {
  return (
    <section>
      <RecentDocs />
    </section>
  );
}

export function RecentBlogPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch blog metadata - sorted by most recent
    const blogPosts = [
      {
        title: 'The Importance of Today',
        permalink: '/blog/the-importance-of-today',
        description: 'Exploring the significance of living in the present moment and making the most of each day',
        date: '2025-10-07T08:28:00+05:30'
      },
      {
        title: 'Zuper Roofing Digital Transformation',
        permalink: '/blog/zuper-roofing-digital-transformation',
        description: 'How Zuper is revolutionizing the roofing industry through digital transformation and field service management',
        date: '2025-10-07T08:28:00+05:30'
      },
      {
        title: 'Blogging Journey',
        permalink: '/blog/blogging-journey',
        description: 'Reflections on starting and maintaining a technical blog, sharing knowledge and experiences',
        date: '2025-10-07T08:28:00+05:30'
      }
    ];

    setPosts(blogPosts.slice(0, 3));
  }, []);

  return (
    <section
      className="margin-top--xl margin-bottom--xl"
      style={{
        backgroundColor: '#f0f8ff',
        padding: '3rem 0',
        borderTop: '2px solid #e0f2ff',
        borderBottom: '2px solid #e0f2ff'
      }}
    >
      <div className="container">
        <Heading
          as="h2"
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#1c1e21',
            fontWeight: '700'
          }}
        >
          Latest Blog Posts ✍️
        </Heading>
        <div className="row">
          {posts.map((post, idx) => (
            <div className="col col--4" key={idx}>
              <div
                className="card margin-bottom--md"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d0e8ff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <div className="card__header" style={{backgroundColor: '#f8fcff', borderBottom: '1px solid #e0f2ff'}}>
                  <Heading as="h3" style={{color: '#2e8555', fontWeight: '600'}}>
                    <Link style={{color: '#2e8555'}} to={post.permalink}>{post.title}</Link>
                  </Heading>
                </div>
                <div className="card__body" style={{flex: 1, color: '#525860'}}>
                  {post.description}
                  <p style={{fontSize: '0.875rem', color: '#8a8f98', marginTop: '1rem'}}>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </p>
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
        category: 'javascript',
        filename: 'nodejs-event-loop-and-non-blocking-io',
        description: 'Understanding the Node.js event loop and non-blocking I/O model for building scalable applications',
        date: '2025-10-07T08:08:00+05:30'
      },
      {
        title: 'AI Trends 2025',
        category: 'ai',
        filename: 'ai-trends-2025',
        description: 'Exploring the latest trends in artificial intelligence and machine learning for 2025',
        date: '2025-10-07T00:43:00+05:30'
      }
    ];

    // Construct Docusaurus-compatible doc permalinks: /docs/{category}/{filename}
    const docsWithPermalinks = docArticles.map(doc => ({
      ...doc,
      permalink: `/docs/${doc.category}/${doc.filename}`
    }));

    setDocs(docsWithPermalinks.slice(0, 2));
  }, []);

  return (
    <section
      className="margin-top--xl margin-bottom--xl"
      style={{
        backgroundColor: '#f8f9fa',
        padding: '3rem 0',
        borderTop: '2px solid #e9ecef',
        borderBottom: '2px solid #e9ecef'
      }}
    >
      <div className="container">
        <Heading
          as="h2"
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#1c1e21',
            fontWeight: '700'
          }}
        >
          Latest Knowledge Base Articles 📚
        </Heading>
        <div className="row">
          {docs.map((doc, idx) => (
            <div className="col col--6" key={idx}>
              <div
                className="card margin-bottom--md"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  border: '1px solid #dee2e6',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <div className="card__header" style={{backgroundColor: '#f5f7fa', borderBottom: '1px solid #e9ecef'}}>
                  <Heading as="h3" style={{color: '#1c1e21', fontWeight: '600'}}>
                    <Link style={{color: '#1c1e21'}} to={doc.permalink}>{doc.title}</Link>
                  </Heading>
                </div>
                <div className="card__body" style={{flex: 1, color: '#525860'}}>
                  {doc.description}
                  <p style={{fontSize: '0.875rem', color: '#8a8f98', marginTop: '1rem'}}>
                    <time dateTime={doc.date}>
                      {new Date(doc.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
