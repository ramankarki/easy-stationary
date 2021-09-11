import { connect } from 'react-redux';

import { APP_SHOPPING_CART_STATE } from '../../actions/constants';

import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import HeroSection from '../../templates/HeroSection';
import RequestStatusModalBg from '../../templates/RequestStatusModalBg';
import SpinnerLoading from '../../components/SpinnerLoading';

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

      {/* modal */}
      {props.requestStatus && (
        <RequestStatusModalBg
          requestStatus={props.requestStatus}
          APP_STATE={APP_SHOPPING_CART_STATE}
        >
          {props.requestStatus === 'pending' ? (
            <SpinnerLoading />
          ) : (
            props.modalMsg(props.requestStatus, props.errorTag)
          )}
        </RequestStatusModalBg>
      )}
    </div>
  );
}

const mapStateToProps = ({ APP_SHOPPING_CART_STATE, SHOPPING_CART }) => ({
  ...APP_SHOPPING_CART_STATE,
  ...SHOPPING_CART,
});

export default connect(mapStateToProps, {})(Cart);
