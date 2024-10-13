import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  color: white;
  padding: 20px;
  min-height: 100vh;
`;

const Poster = styled.img`
  width: 300px; // 포스터의 너비
  height: 450px; // 포스터의 높이
  border-radius: 10px;
  margin-right: 20px; // 포스터와 설명 부분의 간격
`;

const Info = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 8px;
  max-width: 800px;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
`;

const Text = styled.p`
  margin: 5px 0;
  font-size: 18px;
`;

const Credits = styled.div`
  margin-top: 20px;
`;

const CastList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CastMember = styled.li`
  width: 100px;
  text-align: center;
`;

const CastImage = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const Director = styled(CastMember)``; 

const MovieDetail = () => {
  const { movieId } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=e57296830db6b325ab0e91047c0811c6&language=ko-KR&append_to_response=credits`
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  if (isLoading) {
    return <div>로딩 중입니다...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다. 다시 시도해주세요.</div>;
  }

  const { title, release_date, poster_path, overview, runtime, credits = {} } = data || {};
  const director = credits.crew ? credits.crew.find(member => member.job === 'Director') : null;
  const cast = credits.cast ? credits.cast.slice(0, 20) : [];

  return (
    <Container>
      {/* 포스터를 왼쪽에 배치 */}
      {poster_path && <Poster src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />}
      <Info>
        <Title>{title || '정보 없음'}</Title>
        <Text>개봉일: {release_date || '정보 없음'}</Text>
        <Text>줄거리: {overview || '줄거리 정보 없음'}</Text>
        <Text>러닝타임: {runtime ? `${runtime}분` : '정보 없음'}</Text>
        
        {/* 감독 및 출연진 정보를 아래에 배치 */}
        <Credits>
          <h2>감독:</h2>
          <CastList>
            {director && (
              <Director>
                <CastImage src={`https://image.tmdb.org/t/p/w500${director.profile_path}`} alt={director.name} />
                <p>{director.name}</p>
              </Director>
            )}
          </CastList>
          <h3>출연진:</h3>
          <CastList>
            {cast.length > 0 ? (
              cast.map(member => (
                <CastMember key={member.id}>
                  {member.profile_path && (
                    <CastImage src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} />
                  )}
                  <p>{member.name}</p>
                </CastMember>
              ))
            ) : (
              <li>정보 없음</li>
            )}
          </CastList>
        </Credits>
      </Info>
    </Container>
  );
};

export default MovieDetail;