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
        title: 'Mastra AI Framework',
        slug: 'mastra-ai-framework',
        description: 'Exploring the Mastra AI Framework and its capabilities for building intelligent applications',
        date: '2025-10-08'
      },
      {
        title: 'The Importance of Today',
        slug: 'the-importance-of-today',
        description: 'Exploring the significance of living in the present moment and making the most of each day',
        date: '2025-10-07'
      },
      {
        title: 'Zuper Roofing Digital Transformation',
        slug: 'zuper-roofing-digital-transformation',
        description: 'How Zuper is revolutionizing the roofing industry through digital transformation and field service management',
        date: '2025-10-07'
      },
      {
        title: 'Blogging Journey',
        slug: 'blogging-journey',
        description: 'Reflections on starting and maintaining a technical blog, sharing knowledge and experiences',
        date: '2025-10-07T00:26:00+05:30'
      }
    ];
    
    // Build Docusaurus blog permalinks: /blog/YYYY/MM/DD/slug
    const postsWithPermalinks = blogPosts.map(post => {
      const dateObj = new Date(post.date);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return {
        ...post,
        permalink: `/blog/${year}/${month}/${day}/${post.slug}`
      };
    });
    
    setPosts(postsWithPermalinks.slice(0, 3));
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
                <div className="card__header" style={{backgroundColor: '#f8fdff', borderBottom: '1px solid #e0f2ff'}}>
                  <Heading as="h3" style={{color: '#1565c0', fontWeight: '600', fontSize: '1.1rem', marginBottom: '0'}}>
                    <Link style={{color: 'inherit', textDecoration: 'none'}} to={post.permalink}>
                      {post.title}
                    </Link>
                  </Heading>
                </div>
                <div className="card__body" style={{flex: '1', color: '#555'}}>
                  {post.description}
                  <p style={{fontSize: '0.85rem', color: '#666', marginTop: '1rem', marginBottom: '0'}}>
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
                <div className="card__header" style={{backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6'}}>
                  <Heading as="h3" style={{color: '#495057', fontWeight: '600', fontSize: '1.1rem', marginBottom: '0'}}>
                    <Link style={{color: 'inherit', textDecoration: 'none'}} to={doc.permalink}>
                      {doc.title}
                    </Link>
                  </Heading>
                </div>
                <div className="card__body" style={{flex: '1', color: '#555'}}>
                  {doc.description}
                  <p style={{fontSize: '0.85rem', color: '#666', marginTop: '1rem', marginBottom: '0'}}>
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
