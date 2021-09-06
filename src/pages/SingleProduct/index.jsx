import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

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
import RequestStatusModalBg from '../../templates/RequestStatusModalBg';
import SpinnerLoading from '../../components/SpinnerLoading';
import Button from '../../components/Button';
import RatingsStar from '../../components/RatingStars';

import cartIcon from './cart icon.svg';
import './singleProduct.scss';

function SingleProduct(props) {
  const { product } = props;
  let { requestStatus, errorTag, modalMsg } = props;

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  injectReducer(SINGLE_PRODUCT, HOFreducer(SINGLE_PRODUCT, {}));
  injectReducer(
    APP_SINGLE_PRODUCT_STATE,
    HOFreducer(APP_SINGLE_PRODUCT_STATE, appState(APP_SINGLE_PRODUCT_STATE))
  );

  useEffect(() => props.onGet(APP_SINGLE_PRODUCT_STATE), []);

  // convert cloudinary url to transformed url to get transformed image
  product?.imageUrl.forEach((url, index) => {
    const breakUrl = product?.imageUrl[index].split('upload');
    product.imageUrl[index] =
      breakUrl[0] + 'upload/ar_3:2,c_fill' + breakUrl[1];
  });

  // no of people rated
  const noOfPeopleRated = product
    ? Object.values(product.ratings).reduce((acc, val) => acc + val, 0)
    : 0;

  const onSmallImgClick = (index) => () => setActiveImgIndex(index);

  return (
    <div className="singleProduct">
      <Header />
      <BreadCrumb />

      {/* product hero section */}
      <div className="singleProduct__heroSection">
        <picture>
          <img
            className="singleProduct__bigImage"
            src={
              product?.imageUrl[activeImgIndex] ||
              `/assets/image placeholder.svg`
            }
            alt="product"
          />
          <div className="singleProduct__smallImages">
            {product?.imageUrl.map((url, index) => (
              <img
                style={activeImgIndex === index ? { opacity: '1' } : {}}
                src={url}
                alt="product"
                onClick={onSmallImgClick(index)}
              />
            ))}
          </div>
        </picture>

        {/* hero content */}
        <div className="singleProduct__heroContent">
          <h1 className="singleProduct__heroHeading">{product?.productName}</h1>
          <div className="singleProduct__heroRatings">
            <RatingsStar ratings={product?.ratings} />{' '}
            <p>Rated by {noOfPeopleRated} people</p>
          </div>
          <p className="singleProduct__heroBrand">
            Brand: <span>{product?.brandName}</span>
          </p>
          <p className="singleProduct__price">
            <span>Rs. {product?.price}</span> &nbsp; - Delivery charge included
          </p>
          <Button
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <img src={cartIcon} alt="cart" /> Add to cart
          </Button>
        </div>
      </div>

      {/* about product section */}
      <section className="about">
        <h3>Product description</h3>
        <p>{product?.productDescription}</p>
        <hr />
        <h3>Product qualities</h3>
        <ul>
          {product?.productQualities.map(
            (quality) => quality && <li>{quality}</li>
          )}
        </ul>
        <hr />
        <h3>Product specification</h3>
        {product
          ? Object.keys(product.productSpecification).map(
              (key) =>
                key && (
                  <div className="specCell">
                    <span>{key}</span>
                    <span>{product.productSpecification[key]}</span>
                  </div>
                )
            )
          : ''}
      </section>

      {/* modal */}
      {requestStatus && (
        <RequestStatusModalBg requestStatus={requestStatus}>
          {requestStatus === 'pending' ? (
            <SpinnerLoading />
          ) : (
            modalMsg(requestStatus, errorTag)
          )}
        </RequestStatusModalBg>
      )}
    </div>
  );
}

const mapStateToProps = ({ SINGLE_PRODUCT, APP_SINGLE_PRODUCT_STATE }) => ({
  ...SINGLE_PRODUCT,
  ...APP_SINGLE_PRODUCT_STATE,
});

export default connect(mapStateToProps, { onGet })(SingleProduct);
