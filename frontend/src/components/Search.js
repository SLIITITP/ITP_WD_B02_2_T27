import React from 'react';

const Search = ({ items, onSearch }) => {
  return (
    <div>
      <input type="text" onChange={onSearch} />
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
