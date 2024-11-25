import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CiGift } from "react-icons/ci";
import { GoPlay } from "react-icons/go";
import useCustomFetch from '../hooks/useCustomFetch'; 
import CardListSkeleton from '../components/Skeleton/card-list-skeleton';

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
    font-style: italic;
    font-weight: bold;
    font-size: 20px;
    padding: 15px 0;
`;

const Overview = styled.div`
    margin: 10px 0;
    overflow: hidden;
    height: auto;
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

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 30px;  
    right: 20px;
    z-index: 1;
    display: flex;
    align-items: center;
`;

const PurchaseButton = styled.button`
    padding: 10px 19px;
    background-color: #F32F5F;  
    border: none;
    color: white;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  
    &:hover {
        background-color: rgba(243, 47, 95, 0.5);  
    }

    svg {
        margin-right: 3px;
         width: 12px; 
        height: 12px;  
    }
`;

const GiftButton = styled.button`
    padding: 10px 19px;
    background-color: #F32F5F;  
    border: none;
    color: white;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    display: flex;
    align-items: center;
  
    &:hover {
        background-color: rgba(255, 133, 0, 0.5);  
    }

    svg {
         margin-right: 3px;
         width: 12px; 
        height: 12px;  
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

const PurchaseDetail = () => {
    const { movieId } = useParams();
    const { data: movieData, isLoading: isMovieLoading, isError: isMovieError } = useCustomFetch(`/movie/${movieId}?language=ko-KR`);
    const { data: creditsData, isLoading: isCreditsLoading } = useCustomFetch(`/movie/${movieId}/credits?language=ko-KR`);

    const [isPurchased, setIsPurchased] = useState(false);
    const [isGifted, setIsGifted] = useState(false); // 선물 상태 추가

    const handlePurchaseClick = () => {
        setIsPurchased(!isPurchased); // 구매 상태 변경
    };

    const handleGiftClick = () => {
        setIsGifted(!isGifted); // 선물 상태 변경
    };

    if (isMovieLoading || isCreditsLoading) {
        return <CardListSkeleton number={1} />;
    }

    if (isMovieError) {
        return <div style={{ color: 'white' }}>영화 정보를 불러오는 데 문제가 발생했습니다.</div>;
    }

    return (
        <div>
            <DetailSection>
                <ImageWrapper>
                    <img src={`https://image.tmdb.org/t/p/w500${movieData?.backdrop_path}`} alt="영화 포스터" />
                </ImageWrapper>
                <InfoWrapper>
                    <h1>{movieData?.title}</h1>
                    <InfoItem>평균: {movieData?.vote_average}</InfoItem>
                    <InfoItem>개봉일: {movieData?.release_date}</InfoItem>
                    <InfoItem>러닝타임: {movieData?.runtime}분</InfoItem>
                    <Tagline>{movieData?.tagline}</Tagline>
                    <Overview>{movieData?.overview}</Overview>
                </InfoWrapper>
                
                <ButtonWrapper>
                    <PurchaseButton onClick={handlePurchaseClick}>
                        <GoPlay />
                        {isPurchased ? '구매완료' : '구매하기'}
                    </PurchaseButton>
                    <GiftButton onClick={handleGiftClick}>
                        <CiGift />
                        {isGifted ? '선물완료' : '선물하기'}
                    </GiftButton>
                </ButtonWrapper>
            </DetailSection>

            <CreditSection>
                <h2>감독/출연</h2>
                <ActorGrid>
                    {creditsData?.cast && creditsData.cast.length > 0 ? (
                        creditsData.cast.map((actor) => (
                            <ActorProfile key={actor.id}>
                                <ProfileImgWrapper>
                                    <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                                </ProfileImgWrapper>
                                <NameWrapper>
                                    <div className="name">{actor.name}</div>
                                    <Role>{actor.character} ({actor.known_for_department})</Role>
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

export default PurchaseDetail;


