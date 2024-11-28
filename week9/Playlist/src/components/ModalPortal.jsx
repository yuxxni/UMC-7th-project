import ReactDOM from 'react-dom';

const ModalPortal = ({ children }) => {
  if (typeof window === "undefined") {
    return null; // 서버 사이드 렌더링 시 null 반환
  }

  const node = document.getElementById("portal"); // id가 'portal'인 DOM 요소

  return ReactDOM.createPortal(children, node); // 자식 컴포넌트를 지정된 DOM에 렌더링
};

export default ModalPortal;
