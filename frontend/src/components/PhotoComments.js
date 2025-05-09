import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../userContext';
import StyledButton from './StyledButton.js';

function PhotoComments() {
  const { photoId } = useParams();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const userContext = useContext(UserContext);

  useEffect(() => { 
    fetch(`http://localhost:3001/photos/${photoId}`)
      .then(res => res.json())
      .then(data => {
        setPhoto(data.photo);
        setComments(data.comments || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching photo:", err);
        setLoading(false);
      });
  }, [photoId]);

  useEffect(() => {
    fetch(`http://localhost:3001/photos/view/${photoId}`, {
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
    .catch(error => {
      console.error('Error liking photo:', error);
    });
  }, [photoId, userContext]);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (!userContext.user) {
      alert("Please log in to comment");
      return;
    }

    if (!newComment.trim()) return;

    fetch(`http://localhost:3001/comments/${photoId}`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newComment }),
      credentials: 'include'
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to post comment');
        }
        return res.json();
      })
      .then(newCommentData => {
        setComments(prevComments => [...prevComments, newCommentData]);
        setNewComment('');
      })
      .catch(err => console.error("Error adding comment:", err));
  };

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  if (!photo) {
    return <div className="container mt-4">Photo not found</div>;
  }

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-secondary mb-3">Back to Photos</Link>

      <div className="card mb-4">
        <img
          src={photo.path ? `http://localhost:3001${photo.path}` : "/placeholder/400/300"}
          className="card-img-top"
          alt={photo.title}
        />
        <div className="card-body">

          {userContext.user && photo.postedBy && userContext.user._id != photo.postedBy && (
            <>
              <Link
                to={`/photo/report/${photoId}`}
                onClick={(e) => {
                  if (!window.confirm('Are you sure you want to report this photo?')) {
                    e.preventDefault();
                  }
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer",
                  backgroundColor: 'fff',
                  transition: "background-color 0.3s ease",
                  margin: "8px"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fadede'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              >
                Report
              </Link>
            </>
          )}
          <h5 className="card-title">{photo.title || "Untitled Photo"}</h5>
          <p className="card-text">{photo.comment || "No caption provided"}</p>

          <div className="flex items-center mb-2">
            <span className="mr-1">Views: </span>
            <span>{photo.views || 0}</span>
          </div>

          <div className="flex items-center mb-2">
            <span className="mr-1">Likes: </span>
            <span>{photo.likes}</span>
          </div>

          <StyledButton to={`/photo/like/${photoId}`} color="#fff" hoverColor="#dee9fa">
            Like
          </StyledButton>

          {userContext.user && photo.postedBy && userContext.user._id === photo.postedBy && (
            <>
              <StyledButton to={`/photo/edit/${photoId}`} color="#fff" hoverColor="#dee9fa">
                Edit
              </StyledButton>
              <Link
                to={`/photo/delete/${photoId}`}
                onClick={(e) => {
                  if (!window.confirm('Are you sure you want to delete this photo?')) {
                    e.preventDefault();
                  }
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer",
                  backgroundColor: 'fff',
                  transition: "background-color 0.3s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fadede'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
              >
                Delete
              </Link>
            </>
          )}
        </div>
      </div>

      <h4>Comments</h4>

      {userContext.user ? (
        <form onSubmit={handleSubmitComment} className="mb-3">
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Add a comment</label>
            <textarea
              className="form-control"
              id="comment"
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      ) : (
        <p>Please <Link to="/login">log in</Link> to comment.</p>
      )}

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <div className="list-group mb-4">
          {comments.map(comment => (
            <div key={comment._id} className="list-group-item">
              <div className="d-flex w-100 justify-content-between">
                <h6 className="mb-1">{comment.postedBy?.username || 'Anonymous'}</h6>
                <small>{new Date(comment.postedOn).toLocaleDateString()}</small>
              </div>
              <p className="mb-1">{comment.text}</p>
              <div className="flex items-center mb-2">
                <span className="mr-1">Likes: </span>
                <span>{comment.likes}</span>
              </div>

              <StyledButton to={`/comment/like/${comment._id}`} color="#fff" hoverColor="#dee9fa">
                Like
              </StyledButton>
              {userContext.user && photo.postedBy && userContext.user._id === photo.postedBy && (
                <>
                  <StyledButton to={`/comment/edit/${comment._id}`} color="#fff" hoverColor="#dee9fa">
                    Edit
                  </StyledButton>
                  <Link
                    to={`/comment/delete/${comment._id}`}
                    onClick={(e) => {
                      if (!window.confirm('Are you sure you want to delete this comment?')) {
                        e.preventDefault();
                      }
                    }}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "4px",
                      textDecoration: "none",
                      color: "black",
                      cursor: "pointer",
                      backgroundColor: 'fff',
                      transition: "background-color 0.3s ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fadede'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                  >
                    Delete
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PhotoComments;