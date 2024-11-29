import styled from "styled-components";
import useCartStore from "../stores/useCartStore"; 
import { MdShoppingCart as CartIcon } from "react-icons/md"; 

const Navbar = () => {
    const amount = useCartStore((state) => state.amount); 
    console.log("Navbar에서 amount 값:", amount);

    return (
        <Container>
            <ContentWrapper>
                <Logo>UMC PlayList</Logo>
                <CartWrapper>
                    <CartIconStyled />
                    <CartAmount>
                        <p>{amount}</p>
                    </CartAmount>
                </CartWrapper>
            </ContentWrapper>
        </Container>
    );
};

export default Navbar;

const Container = styled.nav`
    background-color: #6C63FF;
    color: #fff;
    padding: 10px 20px; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    height: 80px; 
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center; 
    justify-content: center; 
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    height: 100%; 
`;

const Logo = styled.h1`
    font-size: 1.8rem;
    font-weight: bold;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const CartWrapper = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    height: 100%;
    padding-right: 10px;
`;

const CartIconStyled = styled(CartIcon)`
    width: 28px;
    height: 28px;
    color: #fff;
    cursor: pointer;
`;

const CartAmount = styled.div`
    position: absolute;
    top: 0; 
    right: -10px;
    background-color: #ff6b6b;
    color: #fff;
    font-size: 0.9rem;
    font-weight: bold;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
