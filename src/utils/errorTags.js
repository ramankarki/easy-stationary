import { Link } from 'react-router-dom';

import { ACTIVATE_ACCOUNT, LOGIN } from '../Routes/contants';

import LazyImg from '../components/LazyImg';

const picture = (image) => (
  <picture>
    <LazyImg src={`/assets/${image} icon.svg`} alt={image + ' icon'} />
  </picture>
);

const errorTags = {
  accountAlreadyActive: 'accountAlreadyActive',
  accountNotActive: (
    <div className="Form__modalMsg">
      {picture('error')}
      <p>
        User account with this email is not active.{' '}
        <Link to={ACTIVATE_ACCOUNT}>Activate now</Link>
      </p>
    </div>
  ),
  alreadyExistsNotActive: (
    <div className="Form__modalMsg">
      {picture('user')}
      <p>
        User account with this email already exists but is not active.{' '}
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
  resetPasswordTokenExpired: 'resetPasswordTokenExpired',
  noUserWithEmail: 'noUserWithEmail',
  wrongEmailOrPassword: (
    <div className="Form__modalMsg">
      {picture('error')}
      <p>Email or Password is wrong!</p>
    </div>
  ),
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
