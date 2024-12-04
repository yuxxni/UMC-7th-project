import styled from "styled-components";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchMovieList from "../components/search-movie-list";

const Container = styled.div`
    color: white;
`;

const SearchWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchInput = styled.input`
    flex: 1;
    padding: 15px;
    border: none;
    border-radius: 10px;
`;

const SearchButton = styled.button`
    width: 80px;
    height: 40px;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 5px;
    background-color: #e83261;
    color: white;
    cursor: pointer;
`;

const Search = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>('');

    const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const [searchParam] = useSearchParams({
        mq: ''
    });

    const mq = searchParam.get('mq');

    const handelSearchMovie = () => {
        if (mq === searchValue) return;
        navigate(`/search?mq=${searchValue}`);
    };

    const handelSearchMovieWithKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handelSearchMovie();
        }
    };

    return (
        <Container>
            <SearchWrapper>
                <SearchInput
                    type="text"
                    placeholder="영화 제목을 입력해주세요..."
                    value={searchValue}
                    onChange={onChangeSearchValue}
                    onKeyDown={handelSearchMovieWithKeyboard}
                />
                <SearchButton onClick={handelSearchMovie}>검색</SearchButton>
            </SearchWrapper>
            <SearchMovieList />
        </Container>
    );
};

export default Search;
