import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

import { ejectReducer, injectReducer } from '../../utils/dynamicReducers';
import {
  APP_SINGLE_PRODUCT_STATE,
  SINGLE_PRODUCT,
  APP_SINGLE_CATEGORY_PRODUCTS_STATE,
  MULTIPLE_PRODUCTS,
  REVIEWS,
  UI_REVIEWS_STATE,
  APP_REVIEWS_STATE,
} from '../../actions/constants';
import HOFreducer from '../../reducers/HOFreducer';
import HOFdomainReducer from '../../reducers/HOFdomainReducer';
import appState from '../../appState';
import onGet from '../../actions/onGet';
import onPost from '../../actions/onPost';
import onChangeAndBlur from '../../actions/onChangeAndBlur';
import fields from '../../utils/fields';

import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import RequestStatusModalBg from '../../templates/RequestStatusModalBg';
import SpinnerLoading from '../../components/SpinnerLoading';
import Button from '../../components/Button';
import RatingsStar from '../../components/RatingStars';
import ProductCardGen from '../../templates/ProductCardGen';

import cartIcon from './cart icon.svg';
import './singleProduct.scss';

function SingleProduct(props) {
  const { product, products, Ratings, Description } = props;
  let { requestStatus, errorTag, modalMsg } = props;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [history, setHistory] = useState(true);

  window.addEventListener('popstate', () => {
    if (/auth|admin/.test(window.location.hash)) return;
    document.documentElement.scrollTop = 0;
    setHistory(!history);
  });

  // reviews
  const reviewFields = fields(
    'Ratings',
    'Description',
    'ProductId',
    'CategoryName'
  );
  const [categoryName, productId] = window.location.hash.split('/').slice(1);
  reviewFields['ProductId'].value = productId;
  reviewFields['CategoryName'].value = categoryName;

  useEffect(() => {
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

    // multiple products domain state
    injectReducer(
      MULTIPLE_PRODUCTS,
      HOFdomainReducer(MULTIPLE_PRODUCTS, 'products')
    );

    // reviews state
    injectReducer(REVIEWS, HOFdomainReducer(REVIEWS, 'reviews', 'review'));
    injectReducer(UI_REVIEWS_STATE, HOFreducer(UI_REVIEWS_STATE, reviewFields));
    injectReducer(
      APP_REVIEWS_STATE,
      HOFreducer(APP_REVIEWS_STATE, appState(APP_REVIEWS_STATE))
    );

    props.onGet(APP_SINGLE_PRODUCT_STATE);
    props.onGet(APP_SINGLE_CATEGORY_PRODUCTS_STATE);

    return () => {
      ejectReducer(APP_SINGLE_PRODUCT_STATE);
      ejectReducer(SINGLE_PRODUCT);
      ejectReducer(APP_SINGLE_CATEGORY_PRODUCTS_STATE);
      ejectReducer(MULTIPLE_PRODUCTS);
      ejectReducer(REVIEWS);
      ejectReducer(UI_REVIEWS_STATE);
      ejectReducer(APP_REVIEWS_STATE);
    };
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

  const onSelectRatingEmoji = (index) => () =>
    props.onChangeAndBlur(UI_REVIEWS_STATE, 'Ratings', index);

  const onTextAreaChange = (event) =>
    props.onChangeAndBlur(UI_REVIEWS_STATE, 'Description', event.target.value);

  const onReviewSubmitHandler = (event) => {
    event.preventDefault();
    props.onPost(APP_REVIEWS_STATE, UI_REVIEWS_STATE);
  };

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

        {/* reviews content wrapper */}
        <div className="customerReviews__contentWrapper">
          {/* reviews data graph */}
          <div className="customerReviews__dataContainer">
            {product
              ? Object.keys(product.ratings)
                  .map((key) =>
                    product.ratings[key] ? (
                      <div
                        key={key + 'star'}
                        className="customerReviews__dataCell"
                      >
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

          {/* reviews form */}
          <form
            onSubmit={onReviewSubmitHandler}
            className="customerReviews__form"
          >
            <h3>Give feedback</h3>
            <div className="customerReviews__form__emojis">
              {['☹️', '😐', '🙂', '😊', '😍'].map((emoji, index) => (
                <span
                  key={emoji}
                  onClick={onSelectRatingEmoji(index + 1)}
                  style={Ratings?.value === index + 1 ? { opacity: '1' } : {}}
                >
                  {emoji}
                </span>
              ))}
            </div>
            <textarea
              onChange={onTextAreaChange}
              value={Description?.value}
              placeholder="Leave you message..."
            ></textarea>
            <Button value="Submit" />
          </form>
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
  UI_REVIEWS_STATE,
}) => ({
  ...SINGLE_PRODUCT,
  ...APP_SINGLE_PRODUCT_STATE,
  ...MULTIPLE_PRODUCTS,
  ...UI_REVIEWS_STATE,
});

export default connect(mapStateToProps, { onGet, onChangeAndBlur, onPost })(
  SingleProduct
);
