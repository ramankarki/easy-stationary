import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

import { injectReducer } from '../../utils/dynamicReducers';
import {
  APP_SINGLE_PRODUCT_STATE,
  SINGLE_PRODUCT,
  APP_SINGLE_CATEGORY_PRODUCTS_STATE,
  MULTIPLE_PRODUCTS,
} from '../../actions/constants';
import HOFreducer from '../../reducers/HOFreducer';
import HOFdomainReducer from '../../reducers/HOFdomainReducer';
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
import ProductCardGen from '../../templates/ProductCardGen';

function SingleProduct(props) {
  const { product, products } = props;
  let { requestStatus, errorTag, modalMsg } = props;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [history, setHistory] = useState(window.location.hash);

  window.addEventListener('popstate', () => {
    document.documentElement.scrollTop = 0;
    setHistory(window.location.hash);
  });

  // single product
  injectReducer(SINGLE_PRODUCT, HOFreducer(SINGLE_PRODUCT, {}));
  injectReducer(
    APP_SINGLE_PRODUCT_STATE,
    HOFreducer(APP_SINGLE_PRODUCT_STATE, appState(APP_SINGLE_PRODUCT_STATE))
  );

  // single category products
  injectReducer(
    APP_SINGLE_CATEGORY_PRODUCTS_STATE,
    HOFreducer(
      APP_SINGLE_CATEGORY_PRODUCTS_STATE,
      appState(APP_SINGLE_CATEGORY_PRODUCTS_STATE)
    )
  );
  injectReducer(
    MULTIPLE_PRODUCTS,
    HOFdomainReducer(MULTIPLE_PRODUCTS, 'products')
  );

  useEffect(() => {
    props.onGet(APP_SINGLE_PRODUCT_STATE);
    props.onGet(APP_SINGLE_CATEGORY_PRODUCTS_STATE);
  }, [history]);

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
                key={url + index}
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
            (quality, index) =>
              quality && <li key={quality + index}>{quality}</li>
          )}
        </ul>
        <hr />
        <h3>Product specification</h3>
        {product
          ? Object.keys(product.productSpecification).map(
              (key) =>
                key && (
                  <div key={key} className="specCell">
                    <span>{key}</span>
                    <span>{product.productSpecification[key]}</span>
                  </div>
                )
            )
          : ''}
      </section>

      {/* related items section */}
      <section className="relatedItem">
        <h2>Related items</h2>
        <ProductCardGen products={products && products.slice(0, 3)} />
      </section>

      {/* customer reviews */}
      <section className="customerReviews">
        <h2>Customer reviews</h2>
        <div className="customerReviews__contentWrapper">
          <div className="customerReviews__dataContainer">
            {product
              ? Object.keys(product.ratings)
                  .map((key) =>
                    product.ratings[key] ? (
                      <div className="customerReviews__dataCell">
                        <span>{key} stars</span>
                        <div className="customerReviews__dataCellBox">
                          <div
                            style={{
                              width: `${
                                (product.ratings[key] / noOfPeopleRated) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span>{product.ratings[key]} people</span>
                      </div>
                    ) : (
                      ''
                    )
                  )
                  .reverse()
              : ''}
          </div>
        </div>
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

const mapStateToProps = ({
  SINGLE_PRODUCT,
  APP_SINGLE_PRODUCT_STATE,
  MULTIPLE_PRODUCTS,
}) => ({
  ...SINGLE_PRODUCT,
  ...APP_SINGLE_PRODUCT_STATE,
  ...MULTIPLE_PRODUCTS,
});

export default connect(mapStateToProps, { onGet })(SingleProduct);
