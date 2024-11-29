import { useEffect } from 'react';
import './App.css';
import CartContainer from './components/CartContainer';
import Navbar from './components/Navbar';
import useCartStore from './stores/useCartStore';  // zustand 장바구니 상태
import useModalStore from './stores/useModalStore';  // zustand 모달 상태
import ModalPortal from './components/ModalPortal';
import Modal from './components/Modal';
import Footer from './components/Footer';

function App() {
  const { cartItems, totalAmount, totalPrice, calculateTotals } = useCartStore();  // 장바구니 상태
  const { isOpen } = useModalStore();  // 모달 상태

  useEffect(() => {
    calculateTotals();  // 장바구니 총합 계산
  }, [cartItems, calculateTotals]);  // cartItems가 변경될 때마다 계산

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <CartContainer />
        <div>
          <h2>총 수량: {totalAmount}</h2>
          <h3>총 가격: {totalPrice} 원</h3>
        </div>
        {isOpen && (
          <ModalPortal>
            <Modal>
              <h4>담아두신 모든 음반을 모두 삭제하시겠습니까?</h4>
            </Modal>
          </ModalPortal>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
