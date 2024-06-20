import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');

  const handleSearch = () => {
    onSearch({ query, category, sort });
  };

  return (
    <div className='search-bar'>
      <h1 className='search-bar__heading'>Search for books</h1>
      <div className='search-bar__main-align'>
        <input
          className='search-bar__main'
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className='search-bar__main-icon' onClick={handleSearch}>
          Search
        </button>
        {/* <label>
          <svg src='../public/loupe-icon32x32.jpg'></svg>
        </label> */}
        {/* <button className='search-bar__main-button' onClick={handleSearch}>
          <svg>
            <image src='../public/loupe-icon32x32.jpg'></image>
          </svg>
        </button> */}
        {/* <i className='loupe-icon' aria-hidden='true'></i> */}
        {/* <i src='../public/loupe-icon32x32.jpg'></i> */}
      </div>
      <h2 className='search-bar__select-explanatory'>Categories</h2>
      <select
        className='search-bar__select'
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value='all'>All</option>
        <option value='art'>Art</option>
        <option value='biography'>Biography</option>
        <option value='computers'>Computers</option>
        <option value='history'>History</option>
        <option value='medical'>Medical</option>
        <option value='poetry'>Poetry</option>
      </select>
      <h2 className='search-bar__select-explanatory'>Sorting by</h2>
      <select
        className='search-bar__select'
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value='relevance'>Relevance</option>
        <option value='newest'>Newest</option>
      </select>
      {/* <button className='search-bar__button' onClick={handleSearch}>
        Search
      </button> */}
    </div>
  );
};

export default SearchBar;
