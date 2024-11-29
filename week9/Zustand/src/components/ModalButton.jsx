import styled from "styled-components";

const ModalButton = ({ closeModal, handleClearCart }) => {
  return (
    <ButtonWrapper>
      <YesButton
        type="button"
        onClick={handleClearCart} // 장바구니 초기화 후 모달 닫기
      >
        네
      </YesButton>
      <NoButton
        type="button"
        onClick={closeModal} // 모달만 닫기
      >
        아니요
      </NoButton>
    </ButtonWrapper>
  );
};

export default ModalButton;

// 스타일 컴포넌트 정의
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const YesButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  outline: none; 

  &:hover {
    background-color: #ff5252;
  }

  &:focus {
    outline: none; 
  }
`;

const NoButton = styled.button`
  background-color: #6c63ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  outline: none; 

  &:hover {
    background-color: #5753d1;
  }

  &:focus {
    outline: none; 
  }
`;
