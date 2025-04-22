import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../userContext';

function CommentEdit() {
  const { commentId } = useParams();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  console.log('Component rendering state:', { 
    commentId, 
    user: userContext.user, 
    loading, 
    text, 
    error 
  });

  useEffect(() => {
    if (!userContext.user) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:3001/comments/${commentId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);
        
        if (!data) {
          setError('Comment not found');
          setLoading(false);
          return;
        }
        
        setComment(data);
        setText(data.text || '');
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching comment:", err);
        setError('Failed to load comment');
        setLoading(false);
      });
  }, [commentId, userContext.user, navigate]);
  
  useEffect(() => {
    if (userContext.user && comment && comment.postedBy) {
      const commentOwnerId = typeof comment.postedBy === 'object' ? comment.postedBy._id : comment.postedBy;
      const currentUserId = userContext.user._id;
      
      if (String(commentOwnerId) !== String(currentUserId)) {
        setError('You do not have permission to edit this comment');
      } else {
        setError('');
      }
    }
  }, [comment, userContext.user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`http://localhost:3001/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text}),
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update comment');
        }
        navigate(`/photo/${comment.photoId}`);
      })
      .catch(err => {
        console.error("Error updating comment:", err);
        setError('Failed to update comment');
      });
  };

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Edit comment</h2>
      
      {comment && (
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Text</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="title" 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <Link to={`/photo/${comment.photoId}`} className="btn btn-secondary">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentEdit;