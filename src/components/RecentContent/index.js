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
        slug: 'zuper-roofing-digital-transformation',
        description: 'A comprehensive look at how Zuper revolutionized roofing operations through digital transformation',
        date: '2025-10-07T07:51:00+05:30'
      },
      {
        title: 'Beginning My Blogging Journey',
        slug: 'blogging-journey',
        description: 'Embarking on a new adventure to share knowledge, experiences, and insights through writing',
        date: '2025-10-07T00:26:00+05:30'
      }
    ];

    // Construct Docusaurus-compatible blog permalinks: /blog/YYYY/MM/DD/slug
    const postsWithPermalinks = blogPosts.map(post => {
      const postDate = new Date(post.date);
      const year = postDate.getFullYear();
      const month = String(postDate.getMonth() + 1).padStart(2, '0');
      const day = String(postDate.getDate()).padStart(2, '0');
      return {
        ...post,
        permalink: `/blog/${year}/${month}/${day}/${post.slug}`
      };
    });

    setPosts(postsWithPermalinks.slice(0, 2));
  }, []);

  return (
    <section className="margin-top--xl margin-bottom--xl">
      <div className="container">
        <Heading as="h2" style={{textAlign: 'center', marginBottom: '2rem'}}>
          Latest Blog Posts ✍️
        </Heading>
        <div className="row">
          {posts.map((post, idx) => (
            <div className="col col--6" key={idx}>
              <div className="card margin-bottom--md" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                <div className="card__header">
                  <Heading as="h3">
                    <Link to={post.permalink}>{post.title}</Link>
                  </Heading>
                </div>
                <div className="card__body" style={{flex: 1}}>
                  {post.description}
                  <p style={{fontSize: '0.875rem', color: '#666', marginTop: '0.5rem'}}>
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
                  <Link className="button button--secondary button--block" to={post.permalink}>
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
        category: 'nodejs',
        filename: 'event-loop',
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
                  <Heading as="h3" style={{color: '#1c1e21', fontWeight: '600'}}>
                    <Link to={doc.permalink} style={{color: 'inherit'}}>{doc.title}</Link>
                  </Heading>
                </div>
                <div className="card__body" style={{flex: 1, color: '#495057'}}>
                  {doc.description}
                  <p style={{fontSize: '0.875rem', color: '#6c757d', marginTop: '0.5rem'}}>
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
                  <Link 
                    className="button button--secondary button--block" 
                    to={doc.permalink}
                    style={{fontWeight: '500'}}
                  >
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
