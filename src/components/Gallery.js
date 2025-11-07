import React from 'react';
import ImageCard from './ImageCard';
import './Gallery.css';

const Gallery = ({ images, loading }) => {
  if (loading) {
    return (
      <div className="gallery-loading">
        <div className="spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="gallery-empty">
        <span className="empty-icon">🎨</span>
        <h3>Ничего не найдено</h3>
        <p>Попробуйте изменить фильтры</p>
      </div>
    );
  }

  return (
    <div className="gallery-grid">
      {images.map(image => (
        <ImageCard key={image.id} image={image} />
      ))}
    </div>
  );
};

export default Gallery;
