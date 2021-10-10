import { connect } from 'react-redux';
import { useState, useEffect, useRef } from 'react';

import { ejectReducer, injectReducer } from '../../utils/dynamicReducers';
import {
  APP_SINGLE_PRODUCT_STATE,
  SINGLE_PRODUCT,
  APP_SINGLE_CATEGORY_PRODUCTS_STATE,
  MULTIPLE_PRODUCTS,
  REVIEWS,
  UI_REVIEWS_STATE,
  APP_REVIEWS_STATE,
  UI_SHOPPING_CART_STATE,
  APP_SHOPPING_CART_STATE,
} from '../../actions/constants';
import HOFreducer from '../../reducers/HOFreducer';
import HOFdomainReducer from '../../reducers/HOFdomainReducer';
import appState from '../../appState';
import onGet from '../../actions/onGet';
import onPost from '../../actions/onPost';
import onDelete from '../../actions/onDelete';
import onChangeAndBlur from '../../actions/onChangeAndBlur';
import fields from '../../utils/fields';
import useWishlists from '../../utils/useWishlists';
import { useIntersection } from '../../utils/useIntersection';
import classes from '../../utils/classes';

import Button from '../../components/Button';
import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import RequestStatusModalBg from '../../templates/RequestStatusModalBg';
import SpinnerLoading from '../../components/SpinnerLoading';
import RatingsStar from '../../components/RatingStars';
import ProductCardGen from '../../templates/ProductCardGen';
import Footer from '../../templates/Footer';

import cartIcon from './cart icon.svg';
import wishlistActive from './wishlist-active.svg';
import wishlistInActive from './wishlist-inactive.svg';
import inActive from './inactive-star.svg';
import active from './active-star.svg';
import './singleProduct.scss';

function SingleProduct(props) {
  const { product, products, Ratings, Description, user } = props;

  const { _id } = user || {};

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [history, setHistory] = useState(true);
  const [wishlists, setWishlists] = useWishlists();

  // review states
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('-date');
  const [showSpinner, setShowSpinner] = useState(true);

  let spinnerRef = useRef();

  const refetchData = () => {
    document.documentElement.scrollTop = 0;
    const path = window.location.hash.split('/')[1];
    if (!path || /auth|admin|landing-page|search|cart|dashboard/.test(path))
      return;
    setHistory(!history);
    setPage(1);
    setShowSpinner(true);
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    // reviews
    const reviewFields = fields('Ratings', 'Description');
    const productFields = fields('ProductId', 'CategoryName');
    const [categoryName, productId] = window.location.hash.split('/').slice(1);
    productFields['ProductId'].value = productId;
    productFields['CategoryName'].value = categoryName;

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
    injectReducer(
      UI_REVIEWS_STATE,
      HOFreducer(UI_REVIEWS_STATE, { ...reviewFields, ...productFields })
    );
    injectReducer(
      APP_REVIEWS_STATE,
      HOFreducer(APP_REVIEWS_STATE, appState(APP_REVIEWS_STATE))
    );

    // shopping cart
    injectReducer(
      UI_SHOPPING_CART_STATE,
      HOFreducer(UI_SHOPPING_CART_STATE, productFields)
    );

    props.onGet(APP_SINGLE_PRODUCT_STATE);
    props.onGet(APP_SINGLE_CATEGORY_PRODUCTS_STATE);
    window.addEventListener('popstate', refetchData);

    return () => {
      window.removeEventListener('popstate', refetchData);
      ejectReducer(APP_SINGLE_PRODUCT_STATE);
      ejectReducer(SINGLE_PRODUCT);
      ejectReducer(APP_SINGLE_CATEGORY_PRODUCTS_STATE);
      ejectReducer(MULTIPLE_PRODUCTS);
      ejectReducer(REVIEWS);
      ejectReducer(UI_REVIEWS_STATE);
      ejectReducer(APP_REVIEWS_STATE);
      ejectReducer(UI_SHOPPING_CART_STATE);
    };
  }, [history]);

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

  const onAddToCart = () => {
    props.onPost(APP_SHOPPING_CART_STATE, UI_SHOPPING_CART_STATE);
  };

  const onReviewDelete = (obj) => () =>
    props.onDelete(
      APP_REVIEWS_STATE,
      obj,
      obj.categoryName,
      obj.productId,
      obj.ratings,
      obj.reviewId
    );

  const loadAllReviews = () => {
    if (showSpinner) {
      props.onGet(
        APP_REVIEWS_STATE,
        (data) => {
          setShowSpinner(!!data.reviews.length);
          setPage(page + 1);
        },
        window.location.hash.split('/').slice(1)[1],
        page,
        sort
      );
    }
  };

  useIntersection(
    spinnerRef,
    loadAllReviews,
    props.reviews?.length ? props.reviews : history
  );

  let APP_STATE = APP_SINGLE_PRODUCT_STATE;
  if (!props.requestStatus) {
    if (props.APP_REVIEWS_STATE?.requestStatus) {
      props = { ...props, ...props.APP_REVIEWS_STATE };
      if (props.errorTag === 'alreadyExists')
        props = { ...props, errorTag: 'alreadyExistsReviews' };
      APP_STATE = APP_REVIEWS_STATE;
    } else {
      props = { ...props, ...props.APP_SHOPPING_CART_STATE };
      APP_STATE = APP_SHOPPING_CART_STATE;
    }
  }

  const spinnerClass = classes('customerReviews__spinner', {
    'customerReviews__spinner-show': showSpinner,
  });

  return (
    <div className="singleProduct">
      <Header />
      <BreadCrumb />

      {/* product hero section */}
      <div className="singleProduct__heroSection">
        <picture>
          <img
            src={
              product?.productId in wishlists
                ? wishlistActive
                : wishlistInActive
            }
            alt="heart icon"
            className="wishlists"
            onClick={setWishlists(product?.productId, product?.categoryName)}
          />
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
          <p>
            Your products will be delivered within 2 days in Biratnagar City.
          </p>
          <p className="singleProduct__price">
            <span>Rs. {product?.price}</span> &nbsp; - Delivery charge included
          </p>

          {user?.role !== 'admin' && (
            <Button
              onClick={onAddToCart}
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                padding: '1rem',
              }}
            >
              <img src={cartIcon} alt="cart" /> Add to cart
            </Button>
          )}
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
        <ProductCardGen
          onClick={refetchData}
          products={products && products.slice(0, 3)}
        />
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
          {props.user?.role === 'client' && (
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
          )}

          {/* reviews cards */}
          {props.reviews?.length > 0 && (
            <div className="reviewsCards">
              {props.reviews?.map((review) => (
                <div key={review._id} className="reviewsCards__card">
                  <div className="reviewsCards__cardHead">
                    <div className="ratings">
                      {Array(5)
                        .fill(0)
                        .map((val, index) => {
                          let src = index < review.ratings ? active : inActive;
                          return (
                            <img
                              key={src + 'reviews' + index}
                              src={src}
                              alt="star"
                            />
                          );
                        })}
                    </div>
                    {_id === review.userId && (
                      <Button
                        style={{ marginLeft: 'auto' }}
                        value="Delete"
                        small="true"
                        danger="true"
                        onClick={onReviewDelete(review)}
                      />
                    )}
                  </div>
                  <p className="reviewsCards__cardInfo">
                    <span className="reviewsCards__cardInfo__name">
                      {review.firstName} {review.lastName}
                    </span>
                    -
                    <span>
                      {new Date(review.date).toLocaleDateString('us', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </p>
                  <p className="reviewsCards__cardDesc">{review.description}</p>
                </div>
              ))}
            </div>
          )}

          <div ref={spinnerRef} className={spinnerClass}>
            <SpinnerLoading />
          </div>
        </div>
      </section>

      <Footer />

      {/* modal */}
      {props.requestStatus && (
        <RequestStatusModalBg
          requestStatus={props.requestStatus}
          APP_STATE={APP_STATE}
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

const mapStateToProps = ({
  SINGLE_PRODUCT,
  APP_SINGLE_PRODUCT_STATE,
  MULTIPLE_PRODUCTS,
  UI_REVIEWS_STATE,
  APP_REVIEWS_STATE,
  APP_SHOPPING_CART_STATE,
  REVIEWS,
  USER,
}) => ({
  ...SINGLE_PRODUCT,
  ...APP_SINGLE_PRODUCT_STATE,
  ...MULTIPLE_PRODUCTS,
  ...UI_REVIEWS_STATE,
  APP_REVIEWS_STATE,
  APP_SHOPPING_CART_STATE,
  ...REVIEWS,
  ...USER,
});

export default connect(mapStateToProps, {
  onGet,
  onChangeAndBlur,
  onPost,
  onDelete,
})(SingleProduct);
