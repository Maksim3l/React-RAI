import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';

function LikeHandler() {
  const { photoId } = useParams();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    // Check if user is logged in
    if (!userContext.user) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { from: `/like/${photoId}` } });
      return;
    }

    // Make API call to like the photo
    fetch(`http://localhost:3001/api/photos/${photoId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include authorization if needed
        'Authorization': `Bearer ${userContext.user.token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Navigate back to the photos page with action parameter
      navigate('/?action=like&photoId=' + photoId);
    })
    .catch(error => {
      console.error('Error liking photo:', error);
      // Navigate back even on error
      navigate('/');
    });
  }, [photoId, navigate, userContext]);

  // Simple loading indicator
  return (
    <div className="container mt-4 text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Processing like...</span>
      </div>
      <p>Processing your like...</p>
    </div>
  );
}

export default LikeHandler;