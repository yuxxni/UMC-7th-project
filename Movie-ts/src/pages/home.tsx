import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../apis/axios-instance";
import styled from "styled-components";
import { IoIosStar } from "react-icons/io";
import CardListSkeleton from "../components/Skeleton/card-list-skeleton";

// 타입 정의
interface Movie {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string;
  vote_average: number;
  release_date?: string;
}

interface TrendingMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
}

const fetchTrendingMovies = async (timeWindow: string, page: number): Promise<TrendingMoviesResponse> => {
  const { data } = await axiosInstance.get(
    `/trending/all/${timeWindow}?language=ko-KR&page=${page}`
  );
  return data;
};

const Home = () => {
  const [page, setPage] = useState(1);
  const [timeWindow] = useState("day");
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery<TrendingMoviesResponse, Error>({
    queryKey: ["trendingMovies", timeWindow, page],
    queryFn: () => fetchTrendingMovies(timeWindow, page),
 
  });

  return (
    <Container>
      <h1>Trending Movies</h1>

      {isLoading ? (
        <CardListSkeleton number={20} />
      ) : isError ? (
        <ErrorText>Error loading movies: {error.message}</ErrorText>
      ) : (
        <MovieGrid>
          {data?.results?.map((movie) => (
            <MovieCard
              key={movie.id}
              onClick={() => navigate(`/movies/${movie.id}`)}
            >
              <Poster
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt={movie.title || movie.name}
              />
              <Overlay>
                <MovieInfo>
                  <h3>{movie.title || movie.name}</h3>
                  <p>
                    평점 <IoIosStar /> {movie.vote_average}
                  </p>
                  <p>개봉일 {movie.release_date}</p>
                </MovieInfo>
              </Overlay>
            </MovieCard>
          ))}
        </MovieGrid>
      )}

      <PaginationContainer>
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          이전
        </button>
        <span>{page} Page</span>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          disabled={isLoading || !data?.total_pages || page >= data.total_pages}
        >
          다음
        </button>
      </PaginationContainer>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  padding: 20px;
  color: white;
`;

const ErrorText = styled.p`
  color: red;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const MovieCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;

  &:hover > div {
    opacity: 1;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.3s;
`;

const MovieInfo = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  color: white;

  h3 {
    font-size: 16px;
    margin-bottom: 5px;
  }

  p {
    font-size: 14px;
    margin: 5px 0;
    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
      color: white;
    }
  }
`;

const PaginationContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    background-color: #333;
    color: white;
    margin: 0 10px;

    &:disabled {
      background-color: #555;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 16px;
  }
`;

