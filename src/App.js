import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import FilterBar from './components/FilterBar';
import Gallery from './components/Gallery';
import { fetchImages } from './services/api';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ unit: '', tags: [] });

const loadImages = useCallback(async () => { // Твоя версия с useCallback
  setLoading(true); // Из входящей версии
  const data = await fetchImages(filters); // Твоя версия
  setImages(data);
  setLoading(false);
}, [filters]); // В зависимости ставим "filters", т.к. они используются внутри loadImages

useEffect(() => {
  loadImages();
}, [loadImages, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="App">
      <FilterBar onFilterChange={handleFilterChange} />
      <Gallery images={images} loading={loading} />
      <ToastContainer />
    </div>
  );
}

export default App;
