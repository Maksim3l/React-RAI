import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../userContext';

function PhotoEdit() {
  const { photoId } = useParams();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  console.log('Component rendering state:', { 
    photoId, 
    user: userContext.user, 
    loading, 
    photo, 
    error 
  });

  useEffect(() => {
    // Check if user is logged in
    if (!userContext.user) {
      navigate('/login');
      return;
    }
  
    // Fetch photo details
    fetch(`http://localhost:3001/photos/${photoId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);
        
        if (!data || !data.photo) {
          setError('Photo not found');
          setLoading(false);
          return;
        }
        
        // Set the photo data
        setPhoto(data.photo);
        setTitle(data.photo.title || '');
        setComment(data.photo.comment || '');
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching photo:", err);
        setError('Failed to load photo');
        setLoading(false);
      });
  }, [photoId, userContext.user, navigate]);
  
  useEffect(() => {
    if (userContext.user && photo && photo.postedBy) {
      const photoOwnerId = typeof photo.postedBy === 'object' ? photo.postedBy._id : photo.postedBy;
      const currentUserId = userContext.user._id;
      
      if (String(photoOwnerId) !== String(currentUserId)) {
        setError('You do not have permission to edit this photo');
      } else {
        setError('');
      }
    }
  }, [photo, userContext.user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`http://localhost:3001/photos/${photoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        comment
      }),
      credentials: 'include' // Include session cookies
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update photo');
        }
        navigate(`/photo/${photoId}`);
      })
      .catch(err => {
        console.error("Error updating photo:", err);
        setError('Failed to update photo');
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
      <h2>Edit Photo</h2>
      
      {photo && (
        <div className="row">
          <div className="col-md-6">
            <img 
              src={photo.path ? `http://localhost:3001${photo.path}` : "/placeholder/400/300"} 
              className="img-fluid mb-3" 
              alt={photo.title} 
            />
          </div>
          
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">Caption/Comment</label>
                <textarea 
                  className="form-control" 
                  id="comment" 
                  rows="3"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Save Changes</button>
                <Link to={`/photo/${photoId}`} className="btn btn-secondary">Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhotoEdit;