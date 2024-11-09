import PropTypes from 'prop-types';
import styled from 'styled-components';
import CardSkeleton from "./card-skeleton";

const Container = styled.div`
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    grid-gap: 15px;
`;

const CardListSkeleton = ({number}) => {
    return (
        <Container>
            {new Array(number).fill(0).map((_, ) => <CardSkeleton />)}
        </Container>
    );
};

export default CardListSkeleton;

