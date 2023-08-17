import React from 'react';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon
import './Card.css';

export default function Card(props) {
  const { image, title, onFavoriteClick, onDetailsClick } = props;

  return (
    <div className="card">
      <img src={image} alt={title} style={{ objectFit: 'cover', borderTopLeftRadius: '10px', borderTopRightRadius: '10px',width:'100%' }} />
      <h3>{title}</h3>
      <div className="card-buttons">
        <button className="favorite-button" onClick={onFavoriteClick}>
          <FaHeart /> {/* Use the heart icon */}
        </button>
        <button className="details-button" onClick={onDetailsClick}>
          Details
        </button>
      </div>
    </div>
  );
}
