import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import StyledButton from './StyledButton.js';

function Photo(props) {
  // Add default empty object to avoid undefined errors
  const photo = props.photo || {};
  const [likeCount, setLikeCount] = useState(photo.likes || 0);
  const location = useLocation();
  
  // Check if we're returning from a like action
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('action') === 'like' && params.get('photoId') === photo._id) {
      // Update like count locally without reloading the entire page
      setLikeCount(prevCount => prevCount + 1);
    }
  }, [location, photo._id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card text-black mb-4 shadow">
  <div className="relative bg-white-100">
    <img
      className="card-img"
      src={photo.path ? "http://localhost:3001" + photo.path : "/api/placeholder/400/300"}
      alt={photo.title || "Photo"}
    />
    {/* Title overlay positioned absolutely within the image container */}
    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-30 p-2">
      <h4 className="card-title font-bold text-black">{photo.title || "Untitled Photo"}</h4>
    </div>
  </div>
  

      {/* Details section below image */}
      <div className="card-body bg-gray-50 p-3">
        {/* Comment/Caption */}
        <p className="text-black mb-3">{photo.comment || "No caption provided"}</p>

        {/* Stats and info row */}
        <div className="flex flex-wrap justify-between text-sm text-black mb-3">
          {/* Author */}
          <div className="flex items-center mr-4 mb-2">
            <span className="mr-1">Author: </span>
            <span>{photo.postedBy?.username || "Unknown user"}</span>
          </div>

          {/* Date */}
          <div className="flex items-center mr-4 mb-2">
            <span className="mr-1">Date posted: </span>
            <span>{formatDate(photo.postedOn)}</span>
          </div>

          {/* Views */}
          <div className="flex items-center mb-2">
            <span className="mr-1">Views: </span>
            <span>{photo.views || 0}</span>
          </div>

          <div className="flex items-center mb-2">
            <span className="mr-1">Likes: </span>
            <span>{likeCount}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex border-t pt-3">
          <StyledButton to={`/like/${photo._id}`} color="#fff" hoverColor="#dee9fa">
               Like
           </StyledButton>

           <StyledButton to={`/photo/${photo._id}`} color="#fff" hoverColor="#dee9fa">
               Comment
           </StyledButton>
        </div>

      </div>
    </div>
  );
}

export default Photo;