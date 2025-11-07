import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1';

/**
 * Fetch images from the API with optional filtering
 *
 * @param {Object} filters - Filter options
 * @param {string} filters.unit - Unit filter (leoneed, vbs, mmj, wxs, n25, other)
 * @param {Array<string>} filters.tags - Tags to filter by (AND logic)
 * @returns {Promise<Array>} Array of asset objects
 */
export const fetchImages = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    // Add unit filter
    if (filters.unit) {
      params.append('unit', filters.unit);
    }

    // Add tag filters
    if (filters.tags && filters.tags.length > 0) {
      filters.tags.forEach(tag => params.append('tags[]', tag));
    }

    const response = await axios.get(`${API_BASE_URL}/images${params.toString() ? '?' + params.toString() : ''}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};
