import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';

function CommentLikeHandler() {
  const { commentId } = useParams();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext.user) {
      navigate('/login', { state: { from: `/like/${commentId}` } });
      return;
    }

    fetch(`http://localhost:3001/comments/like/${commentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userContext.user.token}`
      }
    })
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      navigate(`/photo/${data.photoId}`);
    })
    .catch(error => {
      console.error('Error liking comment:', error);
      navigate('/');
    });
  }, [commentId, navigate, userContext]);

  return (
    <div className="container mt-4 text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Processing like...</span>
      </div>
      <p>Processing your like...</p>
    </div>
  );
}

export default CommentLikeHandler;