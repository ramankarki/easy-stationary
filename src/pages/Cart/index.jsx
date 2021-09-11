import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import HeroSection from '../../templates/HeroSection';

import './cart.scss';

function Cart(props) {
  return (
    <div className="cart">
      <Header />
      <BreadCrumb />
      <HeroSection
        imgUrl="url('/assets/cart.webp')"
        heading="Place your order"
        text='Select the product quantity you want. Place your order by clicking "Place order" button and your products will arive at your address in no time.'
      />
    </div>
  );
}

export default Cart;
