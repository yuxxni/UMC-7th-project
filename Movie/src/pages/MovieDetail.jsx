import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useCustomFetch from '../hooks/useCustomFetch';
import CardListSkeleton from '../components/Skeleton/card-list-skeleton';

const PageWrapper = styled.div`
  padding: 20px;
  color: white;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row-reverse; /* 영화 포스터를 오른쪽으로 배치 */
  gap: 20px;
  align-items: flex-start;
  margin-bottom: 30px;

  img {
    width: 300px;
    height: 450px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const InfoSection = styled.div`
  flex: 1;

  h1 {
    font-size: 36px;
    margin: 0;
    margin-bottom: 10px;
  }

  .tagline {
    font-style: italic;
    font-size: 18px;
    margin-bottom: 15px;
  }

  .details {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .overview {
    line-height: 1.6;
    margin-top: 15px;
  }
`;

const Section = styled.div`
  margin-top: 30px;

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const ActorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 15px;
`;

const ActorCard = styled.div`
  text-align: center;

  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
  }

  .name {
    font-size: 14px;
    font-weight: bold;
  }

  .role {
    font-size: 12px;
    color: gray;
  }
`;

const ReviewList = styled.div`
  margin-top: 30px;
  line-height: 1.6;
`;

const ReviewItem = styled.div`
  margin-bottom: 20px;

  .author {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .content {
    font-size: 14px;
  }
`;

const MovieDetail = () => {
  const { movieId } = useParams();

  const { data: movieData, isLoading: isMovieLoading, isError: isMovieError } = useCustomFetch(`/movie/${movieId}?language=ko-KR`);
  const { data: creditsData, isLoading: isCreditsLoading } = useCustomFetch(`/movie/${movieId}/credits?language=ko-KR`);
  const { data: reviewsData, isLoading: isReviewsLoading } = useCustomFetch(`/movie/${movieId}/reviews?language=ko-KR`);

  if (isMovieLoading || isCreditsLoading || isReviewsLoading) {
    return <CardListSkeleton number={1} />;
  }

  if (isMovieError) {
    return <div style={{ color: 'white' }}>영화 정보를 불러오는 데 문제가 발생했습니다.</div>;
  }

  return (
    <PageWrapper>
      <Header>
        {/* 영화 포스터 */}
        <img src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`} alt="영화 포스터" />
        
        {/* 영화 정보 */}
        <InfoSection>
          <h1>{movieData?.title}</h1>
          <div className="tagline">{movieData?.tagline}</div>
          <div className="details">평균 평점: {movieData?.vote_average}</div>
          <div className="details">개봉일: {movieData?.release_date}</div>
          <div className="details">러닝타임: {movieData?.runtime}분</div>
          <div className="overview">{movieData?.overview}</div>
        </InfoSection>
      </Header>

      {/* 배우 섹션 */}
      <Section>
        <h2>감독/출연</h2>
        <ActorGrid>
          {creditsData?.cast?.slice(0, 10).map((actor) => (
            <ActorCard key={actor.id}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : '/default-profile.png'
                }
                alt={actor.name}
              />
              <div className="name">{actor.name}</div>
              <div className="role">{actor.character}</div>
            </ActorCard>
          ))}
        </ActorGrid>
      </Section>


      <Section>
        <h2>리뷰</h2>
        <ReviewList>
          {reviewsData?.results?.length > 0 ? (
            reviewsData.results.map((review) => (
              <ReviewItem key={review.id}>
                <div className="author">{review.author}</div>
                <div className="content">{review.content}</div>
              </ReviewItem>
            ))
          ) : (
            <div>리뷰가 없습니다.</div>
          )}
        </ReviewList>
      </Section>
    </PageWrapper>
  );
};

export default MovieDetail;
