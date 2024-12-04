import styled from 'styled-components';
import CardSkeleton from './card-skeleton';

const Container = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 15px;
`;

interface CardListSkeletonProps {
  number: number; // number는 렌더링할 CardSkeleton의 개수
}

const CardListSkeleton: React.FC<CardListSkeletonProps> = ({ number }) => {
  return (
    <Container>
      {Array.from({ length: number }, (_, index) => (
        <CardSkeleton key={index} /> // 고유한 key 값으로 index 사용
      ))}
    </Container>
  );
};

export default CardListSkeleton;



