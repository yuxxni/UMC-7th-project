import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardSkeleton from "./card-skeleton";

const Container = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(8, 1fr); 
  grid-gap: 15px;
`;

const CardListSkeleton = ({ number }) => {
    return (
        <Container>
            {new Array(number).fill(0).map((_, index) => (
                <CardSkeleton key={index} /> // 고유한 key 값으로 index 사용
            ))}
        </Container>
    );
};

CardListSkeleton.propTypes = {
    number: PropTypes.number.isRequired,
};

export default CardListSkeleton;



