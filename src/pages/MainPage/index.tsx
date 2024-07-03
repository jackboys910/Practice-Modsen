import './index.css';

import React from 'react';

import BookSearch from '../../components/BookSearch';

const MainPage: React.FC = () => {
  return (
    <div className='App'>
      <BookSearch />
    </div>
  );
};

export default MainPage;
