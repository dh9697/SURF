// SearchBar.js

import React, { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // 검색 기능 구현 또는 검색어를 활용하는 다른 작업 수행
    console.log(`검색어: ${searchTerm}`);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        className="search-input"
        placeholder="검색어를 입력하세요"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
