import styled from "styled-components";
import useCustomFetch from "../hooks/useCustomFetch";
import { useParams } from "react-router-dom";


const DetailSection = styled.div`
    color: white;
    height: 400px;
    position: relative;
`;

const InfoWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 450px;
    height: 100%;
    border-bottom: solid 2px white;
    background: rgba(0, 0, 0, 0.6);
    padding: 15px;
`;

const InfoItem = styled.div`
    margin: 10px 0;
`;

const Tagline = styled.div`
    font-stlye: italic;
    font-weight: bold;
    font-size: 20px;
    padding: 15px 0;
`;

const Overview = styled.div`
    margin: 10px 0;
    overflow: hidden; /* 넘치는 부분 숨기기 */
    height: auto; /* 자동 높이 설정 */
`;

const ImageWrapper = styled.div`
    height: 100%;
    position: relative;
    border-radius: 20px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        z-index: 0;
    }
`;

const CreditSection = styled.div`
    color: white;
`;

const ActorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
`;

const ActorProfile = styled.div`
    color: white;
    text-align: center;
`;

const ProfileImgWrapper = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1.5px solid white;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const NameWrapper = styled.div`
    .name {
        font-weight: bold;
        font-size: 12px;
    }
`;

const Role = styled.div`
    font-size: 10px;
    color: gray;
`;

const MovieDetail = () => {
    const { movieId } = useParams();

    const { data: movies, isLoading, isError } = useCustomFetch(`/movie/${movieId}?language=ko-KR`);
    const { data: actors } = useCustomFetch(`/movie/${movieId}/credits?language=ko-KR`);

    if (isLoading) {
        return <div style={{ color: 'white' }}>로딩 중입니다...</div>;
    }

    if (isError) {
        return <div style={{ color: 'white' }}>에러 중입니다...</div>;
    }

    return (
        <div>
            <DetailSection>
                <ImageWrapper>
                    <img src={`https://image.tmdb.org/t/p/w500${movies?.backdrop_path}`} alt='영화 포스터' />
                </ImageWrapper>
                <InfoWrapper>
                    <h1>{movies?.title}</h1>
                    <InfoItem>평균: {movies?.vote_average}</InfoItem>
                    <InfoItem>개봉일: {movies?.release_date}</InfoItem>
                    <InfoItem>러닝타임: {movies?.runtime}분</InfoItem>
                    <Tagline>{movies?.tagline}</Tagline>
                    <Overview>{movies?.overview}</Overview>
                </InfoWrapper>
            </DetailSection>

            <CreditSection>
                <h2>감독/출연</h2>
                <ActorGrid>
                    {actors?.cast && actors.cast.length > 0 ? (
                        actors.cast.map((actor) => (
                            <ActorProfile key={actor.id}>
                                <ProfileImgWrapper>
                                    <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                                </ProfileImgWrapper>
                                <NameWrapper>
                                    <div className="name">{actor.name}</div>
                                    <Role>{actor.character}({actor.known_for_department})</Role>
                                </NameWrapper>
                            </ActorProfile>
                        ))
                    ) : (
                        <div style={{ color: 'white' }}>정보 없음</div>
                    )}
                </ActorGrid>
            </CreditSection>
        </div>
    );
};

export default MovieDetail;
