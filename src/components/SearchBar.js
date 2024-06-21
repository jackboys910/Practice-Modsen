import React, { useState } from 'react';

const SearchBar = ({ onSearch, className }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');

  const handleSearch = () => {
    onSearch({ query, category, sort });
  };

  return (
    <div className={`search-bar ${className}`}>
      <h1 className='search-bar__heading'>Search for books</h1>
      <div className='search-bar__main-align'>
        <input
          className='search-bar__main'
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <i
          className='search-bar__main-icon fa fa-search'
          onClick={handleSearch}
          aria-hidden='true'
        ></i>
        {/* <button className='search-bar__main-iconTest' onClick={handleSearch}>
          Search
        </button> */}
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
    </div>
  );
};

export default SearchBar;
