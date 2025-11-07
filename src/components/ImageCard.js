import React from 'react';
import { toast } from 'react-toastify';
import './ImageCard.css';

const ImageCard = ({ image }) => {
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(image.image_url);
      toast.success('Скопировано!', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        className: 'cute-toast',
      });
    } catch (error) {
      toast.error('Ошибка копирования', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="image-card" onClick={handleCopyUrl}>
      <img src={image.image_url} alt={`${image.unit} background`} loading="lazy" />
      <div className="image-overlay">
        <div className="overlay-content">
          <span className="copy-icon">📋</span>
          <span className="copy-text">Нажмите, чтобы скопировать</span>
        </div>
        <div className="image-meta">
          <span className="unit-badge">{image.unit.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
