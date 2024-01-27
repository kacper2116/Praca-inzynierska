
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CartComponent from "../components/CartComponent";
import { ToastProvider } from 'react-toast-notifications';

const Cart = () => {

  return (


    <ToastProvider>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', minHeight: '100vh' }}>

        <Navbar />
        <CartComponent />
        <Footer />

      </div>

    </ToastProvider>

  );
};

export default Cart;