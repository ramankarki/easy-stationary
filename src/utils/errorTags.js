import { Link, Redirect } from 'react-router-dom';

import {
  ACTIVATE_ACCOUNT,
  LOGIN,
  FORGOT_PASSWORD,
  SIGNUP,
  CART,
} from '../Routes/contants';
import queryString from './getQueryString';

import LazyImg from '../components/LazyImg';

const picture = (image) => (
  <picture>
    <LazyImg src={`/assets/${image} icon.svg`} alt={image + ' icon'} />
  </picture>
);

const errorTags = {
  accountAlreadyActive: (
    <div className="modalBg__modalMsg">
      {picture('user')}
      <p>
        User account with this email is already active.{' '}
        <Link to={LOGIN}>Login</Link>
      </p>
    </div>
  ),
  accountNotActive: (
    <div className="modalBg__modalMsg">
      {picture('error')}
      <p>
        User account with this email is not active!{' '}
        <Link to={ACTIVATE_ACCOUNT}>Activate now</Link>
      </p>
    </div>
  ),
  alreadyExistsNotActive: (
    <div className="modalBg__modalMsg">
      {picture('user')}
      <p>
        User account with this email already exists but is not active!{' '}
        <Link to={ACTIVATE_ACCOUNT}>Activate now</Link>
      </p>
    </div>
  ),
  alreadyExistsSignup: (
    <div className="modalBg__modalMsg">
      {picture('error')}
      <p>
        User account with this email already exists.{' '}
        <Link to={LOGIN}>Login</Link>
      </p>
    </div>
  ),
  alreadyExistsCategory: (
    <div className="modalBg__modalMsg">
      {picture('error')}
      <p>Duplicate category is not allowed!</p>
    </div>
  ),
  alreadyExistsReviews: (
    <div className="modalBg__modalMsg">
      {picture('error')}
      <p>
        Multiple reviews are not allowed. You can edit your previous review.
      </p>
    </div>
  ),
  activationTokenExpired: 'activationTokenExpired',
  resetPasswordTokenExpired: (
    <div className="modalBg__modalMsg">
      {picture('error')}
      <p>
        Reset password token is expired!{' '}
        <Link to={FORGOT_PASSWORD}>Send email again</Link>
      </p>
    </div>
  ),
  noUserWithEmail: (
    <div className="modalBg__modalMsg">
      {picture('error')}
      <p>User account with this email doesn't exists!</p>
    </div>
  ),
  wrongEmailOrPassword: (
    <div className="modalBg__modalMsg">
      {picture('error')}
      <p>Email or Password is wrong!</p>
    </div>
  ),
  userDoesntExistAnymore: (
    <div className="modalBg__modalMsg">
      {picture('error')}
      <p>
        User account has already been deleted!{' '}
        <Link to={SIGNUP}>Signup again</Link>
      </p>
    </div>
  ),
  productQuantityOutOfStock: 'productQuantityOutOfStock',
  buyProductToGiveReview: (
    <div className="modalBg__modalMsg">
      {picture('error')}
      <p>Please buy this product first to give review!</p>
    </div>
  ),
  emailUpdateTokenExpired: 'emailUpdateTokenExpired',
  incorrectPassword: (
    <div className="modalBg__modalMsg">
      {picture('error')}
      <p>Current password is wrong!</p>
    </div>
  ),
  logout: <Redirect to={LOGIN} />,
  invalidToken: (
    <div className="modalBg__modalMsg">
      <picture>
        <img src={`/assets/error icon.svg`} alt="error icon" />
      </picture>
      <p>
        Something went wrong!{' '}
        <Link
          to={
            queryString()['reset-password-token']
              ? FORGOT_PASSWORD
              : ACTIVATE_ACCOUNT
          }
        >
          Send email again
        </Link>
      </p>
    </div>
  ),
  productAlreadyExistsShoppingCart: (
    <div className="modalBg__modalMsg">
      {picture('error')}
      <p>
        This product is already in shopping cart. <br />
        <Link to={CART}>Place order</Link>
      </p>
    </div>
  ),
  'jwt expired': (
    <div className="modalBg__modalMsg">
      <picture>
        <img src={`/assets/error icon.svg`} alt="error icon" />
      </picture>
      {queryString()['reset-password-token'] ? (
        <p>
          Reset password failed!{' '}
          <Link
            to={
              queryString()['reset-password-token']
                ? FORGOT_PASSWORD
                : ACTIVATE_ACCOUNT
            }
          >
            Send email again
          </Link>
        </p>
      ) : (
        <p>
          Account activation failed!{' '}
          <Link
            to={
              queryString()['reset-password-token']
                ? FORGOT_PASSWORD
                : ACTIVATE_ACCOUNT
            }
          >
            Send email again
          </Link>
        </p>
      )}
    </div>
  ),
};

const getErrorTag = (errorTag) =>
  errorTags[errorTag] || (
    <div className="modalBg__modalMsg">
      {picture('error')}
      <p>Something went wrong. Please try again later!</p>
    </div>
  );
export default getErrorTag;
