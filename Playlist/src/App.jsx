import { useEffect } from 'react';
import './App.css';
import CartContainer from './components/CartContainer';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals } from './features/cart/cartSlice';
import ModalPortal from './components/ModalPortal';
import Modal from './components/Modal';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch])

  return (
    <>
      <header>
        <Navbar/>
      </header>
      <main>
        <CartContainer/>
        {isOpen &&
          <ModalPortal>
            <Modal>
              <h4>담아두신 모든 음반을 모두 삭제하시겠습니까?</h4>              
            </Modal>
          </ModalPortal>
        }
      </main>
      <Footer />
    </>
  )
}

export default App
