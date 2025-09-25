import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getFilePreview, deletePost } from '../utils/appwrite';
import { useAuth } from '../contexts/AuthContext';

function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(id);
        setPost(response);
      } catch (err) {
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(post.$id);
        navigate('/');
      } catch (err) {
        alert('Failed to delete post');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return null;

  let imageUrl = null;
  if (post.coverImageId) {
    try {
      const preview = getFilePreview(post.coverImageId);
      imageUrl = preview.href || preview;
    } catch (err) {
      imageUrl = null;
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <h2>{post.title}</h2>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title}
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', marginBottom: '1rem' }}
        />
      )}
      <div>
        <p>{post.content}</p>
      </div>
      {user && user.$id === post.authorId && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={() => navigate(`/new?id=${post.$id}`)} style={{ marginRight: '1rem' }}>
            Edit
          </button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
