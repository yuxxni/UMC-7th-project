
import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  background-color: #131416;
  min-height: calc(100vh - 50px); 
  color: white;  
  padding: 20px;
`;

const Search = () => {
  return (
    <SearchContainer>
      <h1>검색페이지 야호~!</h1>
    </SearchContainer>
  );
};
export default Search;