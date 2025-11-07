import React, { useState } from 'react';
import './FilterBar.css';

const UNITS = [
  { id: 'leoneed', name: 'Leo/need', color: '#4455dd' },
  { id: 'vbs', name: 'VBS', color: '#ee1166' },
  { id: 'mmj', name: 'MMJ', color: '#44cc66' },
  { id: 'wxs', name: 'WxS', color: '#ff9933' },
  { id: 'n25', name: '25-ji', color: '#8855bb' },
  { id: 'other', name: 'Other', color: '#999999' },
];

const LOCATION_TAGS = [
  'room',
  'school',
  'stage',
  'street',
  'cafe',
  'park',
  'outdoor',
  'indoor',
  'sekai',
];

const TIME_TAGS = [
  'день',
  'вечер',
  'ночь',
];

const EVENT_TAGS = [
  'event',
  'festival',
];

const FilterBar = ({ onFilterChange }) => {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleUnitClick = (unitId) => {
    const newUnit = selectedUnit === unitId ? '' : unitId;
    setSelectedUnit(newUnit);
    onFilterChange({ unit: newUnit, tags: selectedTags });
  };

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onFilterChange({ unit: selectedUnit, tags: newTags });
  };

  const handleClearAll = () => {
    setSelectedUnit('');
    setSelectedTags([]);
    onFilterChange({ unit: '', tags: [] });
  };

  const hasActiveFilters = selectedUnit || selectedTags.length > 0;

  // Показывать временные теги только если выбран хотя бы один локационный тег
  const hasLocationSelected = selectedTags.some(tag => LOCATION_TAGS.includes(tag));

  return (
    <div className="filter-bar">
      <div className="filter-container">
        <div className="filter-header">
          <h2 className="filter-title">🎨 Sekai Gallery</h2>
          <button
            className="filter-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '▲ Скрыть фильтры' : '▼ Показать фильтры'}
          </button>
        </div>

        <div className={`filter-content ${isExpanded ? 'expanded' : ''}`}>
          <div className="filter-section">
            <h3 className="section-title">Юниты</h3>
            <div className="unit-filters">
              {UNITS.map(unit => (
                <button
                  key={unit.id}
                  className={`unit-btn ${selectedUnit === unit.id ? 'active' : ''}`}
                  onClick={() => handleUnitClick(unit.id)}
                  style={{
                    '--unit-color': unit.color,
                  }}
                >
                  {unit.name}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3 className="section-title">Локация</h3>
            <div className="tag-filters">
              {LOCATION_TAGS.map(tag => (
                <label key={tag} className="tag-label">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                  />
                  <span className="tag-checkbox">
                    {selectedTags.includes(tag) ? '✓' : ''}
                  </span>
                  <span className="tag-name">{tag}</span>
                </label>
              ))}
            </div>
          </div>

          {hasLocationSelected && (
            <div className="filter-section time-section">
              <h3 className="section-title">⏰ Время суток</h3>
              <div className="tag-filters">
                {TIME_TAGS.map(tag => (
                  <label key={tag} className="tag-label time-tag">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                    />
                    <span className="tag-checkbox">
                      {selectedTags.includes(tag) ? '✓' : ''}
                    </span>
                    <span className="tag-name">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="filter-section">
            <h3 className="section-title">🎭 Событие</h3>
            <div className="tag-filters">
              {EVENT_TAGS.map(tag => (
                <label key={tag} className="tag-label">
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                  />
                  <span className="tag-checkbox">
                    {selectedTags.includes(tag) ? '✓' : ''}
                  </span>
                  <span className="tag-name">{tag}</span>
                </label>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <button className="clear-btn" onClick={handleClearAll}>
              ✕ Сбросить все фильтры
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
