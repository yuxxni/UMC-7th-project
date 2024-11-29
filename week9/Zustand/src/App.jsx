import { useEffect } from 'react';
import './App.css';
import CartContainer from './components/CartContainer';
import Navbar from './components/Navbar';
import useCartStore from './stores/useCartStore';  
import useModalStore from './stores/useModalStore';  
import ModalPortal from './components/ModalPortal';
import Modal from './components/Modal';
import Footer from './components/Footer';

function App() {
  const { cartItems, totalAmount, totalPrice, calculateTotals } = useCartStore();  
  const { isOpen } = useModalStore();  
  useEffect(() => {
    calculateTotals();  
  }, [cartItems, calculateTotals]);  

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
