import { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';

function PhotoReportHandler() {
  const { photoId } = useParams();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext.user) {
      navigate('/login', { state: { from: `/like/${photoId}` } });
      return;
    }

    fetch(`http://localhost:3001/photos/report/${photoId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
      navigate('/');
    })
    .catch(error => {
      console.error('Error reporting photo:', error);
      navigate('/');
    });
  }, [photoId, navigate, userContext]);

  return (
    <div className="container mt-4 text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Processing report...</span>
      </div>
      <p>Processing your report...</p>
    </div>
  );
}

export default PhotoReportHandler;