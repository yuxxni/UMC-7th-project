import styled from "styled-components";
import { useDispatch } from "react-redux";
import { closeModal } from "../features/modal/modalSlice"; 
import { clearCart } from "../features/cart/cartSlice"; 

const Modal = ({ children }) => {
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal()); 
    };

    const handleClearCart = () => {
        dispatch(clearCart()); 
        handleCloseModal(); // 모달 닫기
    };

    return (
        <Container onClick={handleCloseModal}>
            <ContentWrapper onClick={(e) => e.stopPropagation()}>
                <h4>{children}</h4>
                <div>
                    <button onClick={handleClearCart}>네</button>
                    <button onClick={handleCloseModal}>아니요</button>
                </div>
            </ContentWrapper>
        </Container>
    );
};

export default Modal;

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); 
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; 
`;

const ContentWrapper = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;
