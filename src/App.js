import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    loadImages();
  }, [filters]);

  const loadImages = async () => {
    setLoading(true);
    const data = await fetchImages(filters);
    setImages(data);
    setLoading(false);
  };

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
