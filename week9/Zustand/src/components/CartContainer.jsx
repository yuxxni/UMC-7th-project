import { useEffect } from 'react';
import styled from 'styled-components'; 
import CartItem from "./CartItem";
import useCartStore from '../stores/useCartStore'; // zustand cart store
import useModalStore from '../stores/useModalStore'; // zustand modal store

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px;
    width: 90%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
`;

const Header = styled.header`
    font-size: 1.2rem;
    margin-bottom: 20px;
    h2 {
        color: #333;
    }
`;

const PriceWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 10px 0;
    margin-bottom: 20px;
    h4 {
        font-size: 1rem;
    }
`;

const Footer = styled.footer`
    margin-top: 20px; 
    padding: 10px;
    border-top: 2px solid #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100px;
`;

const Button = styled.button`
    background-color: #ff6f61;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        background-color: #e55e50;
    }
    margin-top: 0;
`;

function CartContainer() {
    // useCartStore에서 cartItems와 calculateTotals 가져오기
    const { cartItems, total, calculateTotals } = useCartStore();
    // useModalStore에서 openModal 가져오기
    const { openModal } = useModalStore();

    // 총 가격을 계산하는 useEffect (cartItems 변경 시마다 총 가격 계산)
    useEffect(() => {
        calculateTotals();
    }, [cartItems, calculateTotals]);

    return (
        <Container>
            <Header>
                <h2>당신이 선택한 음반</h2>
            </Header>
            <div>
                {cartItems.map((item) => {
                    return <CartItem key={item.id} {...item} />;
                })}
            </div>
            <PriceWrapper>
                <h4>총 가격</h4>
                <h4>₩ {total}원</h4>
            </PriceWrapper>
            <Footer>
                {/* 장바구니 초기화 버튼 클릭 시 모달 열기 */}
                <Button onClick={openModal}>
                    장바구니 초기화
                </Button>
            </Footer>
        </Container>
    );
}

export default CartContainer;
