import styled from "styled-components";
import useModalStore from "../stores/useModalStore"; // zustand modal store
import useCartStore from "../stores/useCartStore"; // zustand cart store

const Modal = ({ children }) => {
    // zustand를 사용하여 모달 상태와 장바구니 초기화 액션 가져오기
    const { closeModal } = useModalStore();
    const { clearCart } = useCartStore();

    const handleCloseModal = () => {
        closeModal(); // 모달 닫기
    };

    const handleClearCart = () => {
        clearCart(); // 장바구니 초기화
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
