import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { listPosts, Query } from '../utils/appwrite';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Only fetch published posts (status == 'published'), if such a field exists
        const response = await listPosts({
          queries: [Query.orderDesc('createdAt')],
        });
        setPosts(response.documents);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Recent Posts</h2>
      {posts.length === 0 && <p>No posts yet.</p>}
      {posts.map((post) => (
        <PostCard key={post.$id} post={post} />
      ))}
    </div>
  );
}

export default Home;
