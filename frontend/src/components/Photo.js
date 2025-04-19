import React, { useState } from 'react';
import StyledButton from './StyledButton';

function Photo(props) {
  // Add default empty object to avoid undefined errors
  const photo = props.photo || {};
  const [likeCount, setLikeCount] = useState(photo.likes || 0);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLike = () => {
    setLikeCount(prevCount => prevCount + 1);
    // Here you would normally also make an API call to update likes
    // fetch(`http://localhost:3001/photos/${photo._id}/like`, { method: 'POST' })
  };

  const handleComment = () => {
    // This would typically open a comment modal or navigate to comments section
    alert("Comment feature would open here!");
    // Or implement your own comment logic
  };

  return (
    <div className="card text-black mb-4 shadow">
      <img
        className="card-img"
        src={photo.path ? "http://localhost:3001/" + photo.path : "/api/placeholder/400/300"}
        alt={photo.title || "Photo"}
      />

      {/* Title overlay */}
      <div className="card-img-overlay">
        <h4 className="card-title font-bold">{photo.title || "Untitled Photo"}</h4>
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
        </div>

        {/* Action buttons */}
        <div className="flex border-t pt-3">
          <button
            onClick={handleLike}
            className="flex-1 flex items-center justify-center py-2 text-red-500 hover:bg-red-50 transition-colors"
          >
            <span className="mr-1">❤️</span>
            <span>Like ({likeCount})</span>
          </button>


           <StyledButton to="/publish" color="#fff" hoverColor="#dee9fa">
               Comment
           </StyledButton>
        </div>

      </div>
    </div>
  );
}

export default Photo;