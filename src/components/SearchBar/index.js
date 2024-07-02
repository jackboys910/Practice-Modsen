import React, { useState } from 'react';

const SearchBar = ({ onSearch, className }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('relevance');

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'art', label: 'Art' },
    { value: 'biography', label: 'Biography' },
    { value: 'computers', label: 'Computers' },
    { value: 'history', label: 'History' },
    { value: 'medical', label: 'Medical' },
    { value: 'poetry', label: 'Poetry' },
  ];

  const sorts = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest' },
  ];

  const handleSearch = () => {
    onSearch({ query: query || 'all', category, sort });
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div className={`search-bar ${className}`}>
      <h1 className='search-bar__heading'>Search for books</h1>
      <div className='search-bar__main-align'>
        <input className='search-bar__main' type='text' value={query} onChange={handleQueryChange} onKeyPress={handleKeyPress} />
        <button className='search-bar__main-button' onClick={handleSearch}>
          <i className='fa fa-search' aria-hidden='true'></i>
        </button>
      </div>
      <h2 className='search-bar__select-explanatory'>Categories</h2>
      <select className='search-bar__select' value={category} onChange={handleCategoryChange}>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      <h2 className='search-bar__select-explanatory'>Sorting by</h2>
      <select className='search-bar__select' value={sort} onChange={handleSortChange}>
        {sorts.map((sort) => (
          <option key={sort.value} value={sort.value}>
            {sort.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
