import { Link } from 'react-router-dom';

import { ACTIVATE_ACCOUNT, LOGIN } from '../Routes/contants';

import LazyImg from '../components/LazyImg';

const errorTags = {
  accountAlreadyActive: 'accountAlreadyActive',
  accountNotActive: 'accountNotActive',
  alreadyExistsNotActive: (
    <div className="Form__modalMsg">
      <picture>
        <LazyImg src="/assets/user icon.svg" alt="user icon" />
      </picture>
      <p>
        User account with this email already exists but is not active.{' '}
        <Link to={ACTIVATE_ACCOUNT}>Activate now</Link>
      </p>
    </div>
  ),
  alreadyExists: (
    <div className="Form__modalMsg">
      <picture>
        <LazyImg src="/assets/error icon.svg" alt="user icon" />
      </picture>
      <p>
        User account with this email already exists.{' '}
        <Link to={LOGIN}>Login</Link>
      </p>
    </div>
  ),
  activationTokenExpired: 'activationTokenExpired',
  resetPasswordTokenExpired: 'resetPasswordTokenExpired',
  noUserWithEmail: 'noUserWithEmail',
  wrongEmailOrPassword: 'wrongEmailOrPassword',
  userDoesntExistAnymore: 'userDoesntExistAnymore',
  productQuantityOutOfStock: 'productQuantityOutOfStock',
  buyProductToGiveReview: 'buyProductToGiveReview',
  emailUpdateTokenExpired: 'emailUpdateTokenExpired',
  incorrectPassword: 'incorrectPassword',
  logout: 'logout',
  invalidToken: 'invalidToken',
};

const getErrorTag = (errorTag) =>
  errorTags[errorTag] || <p>Something went wrong! Please try again later</p>;
export default getErrorTag;
