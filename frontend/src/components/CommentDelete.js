import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';

const CommentDelete = () => {
  const [error, setError] = useState(null);
  const { commentId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:3001/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete comment');
        }
        navigate(`/`);
      })
      .catch(err => {
        console.error("Error deleting comment:", err);
        setError('Failed to delete comment');
        navigate(`/`);
      });
  }, []); 
  
  return (
    <div className="text-center py-8">
      <p>Deleting comment...</p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default CommentDelete;