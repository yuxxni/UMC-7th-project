import styled from 'styled-components';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'; 
import useCartStore from '../stores/useCartStore'; // Zustand 훅 import

const CartItem = ({ id, title, singer, price, img, amount }) => {
    const { increase, decrease, removeItem } = useCartStore(); // Zustand에서 액션 가져오기

    return (
        <Container>
            <Img src={img} alt={`${title} 이미지`} />
            <div>
                <Title>
                    {title} | {singer}
                </Title>
                <Price>₩ {price}</Price>
            </div>
            <BtnWrapper>
                <Button onClick={() => increase(id)}>
                    <ChevronUpStyled />
                </Button>
                <Amount>{amount}</Amount>
                <Button
                    onClick={() => {
                        if (amount === 1) {
                            removeItem(id);
                            return;
                        }
                        decrease(id);
                    }}
                >
                    <ChevronDownStyled />
                </Button>
            </BtnWrapper>
        </Container>
    );
};

export default CartItem;

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const Img = styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
`;

const Title = styled.h4`
    font-size: 1rem;
    margin: 0;
    font-weight: bold;
`;

const Price = styled.h4`
    font-size: 1rem;
    color: #333;
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    gap: 5px;
`;

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: #635ef2; 
    transition: color 0.3s ease;

    &:hover {
        color: #000; 
    }
`;

const Amount = styled.p`
    font-size: 1rem;
    font-weight: bold;
    margin: 0;
`;

const ChevronUpStyled = styled(MdKeyboardArrowUp)`
    color: #635ef2; 
    font-size: 24px; 
`;

const ChevronDownStyled = styled(MdKeyboardArrowDown)`
    color: #635ef2; 
    font-size: 24px; 
`;
