import React from 'react';
import { Link } from 'react-router-dom';
import { getFilePreview } from '../utils/appwrite';

function PostCard({ post }) {
  let imageUrl = null;
  try {
    if (post.coverImageId) {
      const preview = getFilePreview(post.coverImageId);
      // preview is a URL object; .href returns the string
      imageUrl = preview.href || preview;
    }
  } catch (error) {
    imageUrl = null;
  }

  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={post.title}
          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', marginBottom: '0.5rem' }}
        />
      )}
      <h2 style={{ marginTop: 0 }}>
        <Link to={`/posts/${post.$id}`}>{post.title}</Link>
      </h2>
      {post.content && (
        <p>{post.content.length > 150 ? `${post.content.slice(0, 150)}...` : post.content}</p>
      )}
    </div>
  );
}

export default PostCard;
