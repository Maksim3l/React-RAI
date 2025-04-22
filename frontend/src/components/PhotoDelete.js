import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext';

const PhotoDelete = () => {
  const [error, setError] = useState(null);
  const { photoId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:3001/photos/${photoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to delete photo');
        }
        navigate(`/`);
      })
      .catch(err => {
        console.error("Error deleting photo:", err);
        setError('Failed to delete photo');
        navigate(`/photo/${photoId}`);
      });
  }, []); 
  
  return (
    <div className="text-center py-8">
      <p>Deleting photo...</p>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default PhotoDelete;