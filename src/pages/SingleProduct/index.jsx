import { connect } from 'react-redux';

import { injectReducer } from '../../utils/dynamicReducers';
import {
  APP_SINGLE_PRODUCT_STATE,
  SINGLE_PRODUCT,
} from '../../actions/constants';
import HOFreducer from '../../reducers/HOFreducer';
import appState from '../../appState';
import onGet from '../../actions/onGet';

import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';

import './singleProduct.scss';

function SingleProduct(props) {
  const { product } = props;

  injectReducer(SINGLE_PRODUCT, HOFreducer(SINGLE_PRODUCT, {}));
  injectReducer(
    APP_SINGLE_PRODUCT_STATE,
    HOFreducer(APP_SINGLE_PRODUCT_STATE, appState(APP_SINGLE_PRODUCT_STATE))
  );

  if (!product) props.onGet(APP_SINGLE_PRODUCT_STATE);

  return (
    <div className="singleProduct">
      <Header />
      <BreadCrumb />

      <div className="singleProduct__heroSection">
        <picture></picture>
        <div className="singleProduct__heroSection__content"></div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ SINGLE_PRODUCT }) => ({ ...SINGLE_PRODUCT });

export default connect(mapStateToProps, { onGet })(SingleProduct);
