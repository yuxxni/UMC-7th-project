import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch";
import { useSearchParams } from "react-router-dom";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton";
import MovieCard from "./MovieCard";
import useDebounce from "../hooks/debounce";

const MoviesContainer = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* 카드의 최소 크기 증가 */
    grid-gap: 20px;  /* 간격을 더 넓게 설정 */
`;

const SearchMovieList = () => {
    const [searchParam, setSearchParams] = useSearchParams({
        mq: ''
    });
    const mq = searchParam.get('mq'); 

    const debounceText = useDebounce(mq, 200);  // 디바운스 처리

    const url = `/search/movie?query=${debounceText}&include_adult=false&language=ko-KR&page=1`;  
    const { data: movies, isLoading, isError } = useCustomFetch(url);

    if (isLoading) {
        return (
            <MoviesContainer>
                <CardListSkeleton number={20} />
            </MoviesContainer>
        );
    }

    if (isError) {
        return (
            <MoviesContainer>
                <h1>데이터를 가져오는 데 문제가 발생했습니다. 다시 시도해 주세요.</h1>
            </MoviesContainer>
        );
    }

    if (mq && movies?.results?.length === 0) {
        return (
            <MoviesContainer>
                <h1>해당하는 검색어 "{mq}"에 해당하는 데이터가 없습니다.</h1>
            </MoviesContainer>
        );
    }

    return (
        <MoviesContainer>
            {movies?.results?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </MoviesContainer>
    );
};

export default SearchMovieList;





