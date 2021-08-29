import { Link } from 'react-router-dom';

import {
  ACTIVATE_ACCOUNT,
  LOGIN,
  FORGOT_PASSWORD,
  SIGNUP,
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
    <div className="Form__modalMsg">
      {picture('user')}
      <p>
        User account with this email is already active.{' '}
        <Link to={LOGIN}>Login</Link>
      </p>
    </div>
  ),
  accountNotActive: (
    <div className="Form__modalMsg">
      {picture('error')}
      <p>
        User account with this email is not active!{' '}
        <Link to={ACTIVATE_ACCOUNT}>Activate now</Link>
      </p>
    </div>
  ),
  alreadyExistsNotActive: (
    <div className="Form__modalMsg">
      {picture('user')}
      <p>
        User account with this email already exists but is not active!{' '}
        <Link to={ACTIVATE_ACCOUNT}>Activate now</Link>
      </p>
    </div>
  ),
  alreadyExists: (
    <div className="Form__modalMsg">
      {picture('error')}
      <p>
        User account with this email already exists.{' '}
        <Link to={LOGIN}>Login</Link>
      </p>
    </div>
  ),
  activationTokenExpired: 'activationTokenExpired',
  resetPasswordTokenExpired: (
    <div className="Form__modalMsg">
      {picture('error')}
      <p>
        Reset password token is expired!{' '}
        <Link to={FORGOT_PASSWORD}>Send email again</Link>
      </p>
    </div>
  ),
  noUserWithEmail: (
    <div className="Form__modalMsg">
      {picture('error')}
      <p>User account with this email doesn't exists!</p>
    </div>
  ),
  wrongEmailOrPassword: (
    <div className="Form__modalMsg">
      {picture('error')}
      <p>Email or Password is wrong!</p>
    </div>
  ),
  userDoesntExistAnymore: (
    <div className="Form__modalMsg">
      {picture('error')}
      <p>
        User account has already been deleted!{' '}
        <Link to={SIGNUP}>Signup again</Link>
      </p>
    </div>
  ),
  productQuantityOutOfStock: 'productQuantityOutOfStock',
  buyProductToGiveReview: 'buyProductToGiveReview',
  emailUpdateTokenExpired: 'emailUpdateTokenExpired',
  incorrectPassword: 'incorrectPassword',
  logout: 'logout',
  invalidToken: (
    <div className="Form__modalMsg">
      {picture('error')}
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
};

const getErrorTag = (errorTag) =>
  errorTags[errorTag] || (
    <div className="Form__modalMsg">
      {picture('error')}
      <p>Something went wrong! Please try again later</p>
    </div>
  );
export default getErrorTag;
