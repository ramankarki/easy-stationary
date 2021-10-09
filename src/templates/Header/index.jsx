import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import {
  UI_SEARCH_STATE,
  APP_SHOPPING_CART_STATE,
  SHOPPING_CART,
  APP_ACTIVATE_ACCOUNT_STATE,
  USER,
  APP_USER_EMAIL_UPDATE_STATE,
} from '../../actions/constants';
import fields from '../../utils/fields';
import { ejectReducer, injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';
import {
  LOGIN,
  SIGNUP,
  CART,
  ADMIN,
  DASHBOARD,
  SEARCH,
  ROOT,
} from '../../Routes/contants';
import appState from '../../appState';
import onGet from '../../actions/onGet';
import getQueryString from '../../utils/getQueryString';
import dropdownData, { commonButtons } from './dropdownData';
import dashboardLinks from '../ClientDashboard/asideButtonsData';
import onPatch from '../../actions/onPatch';

import Button from '../../components/Button';
import InputField from '../../components/InputField';
import LinkButton from '../../components/LinkButton';
import LazyImg from '../../components/LazyImg';
import Hamburgur from '../../components/Hamburgur';
import RequestStatusModalBg from '../../templates/RequestStatusModalBg';
import SpinnerLoading from '../../components/SpinnerLoading';

import searchIcon from './search icon.svg';
import cartIcon from './cart icon.svg';
import userIcon from './user icon.svg';
import './header.scss';

function Header(props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  const user = props.USER?.user;
  const isAuth = !!user;
  const isClient = user?.role === 'client';

  if (props.APP_ACTIVATE_ACCOUNT_STATE?.requestStatus) {
    props = {
      ...props,
      ...props.APP_ACTIVATE_ACCOUNT_STATE,
      APP_STATE: APP_ACTIVATE_ACCOUNT_STATE,
    };
  } else {
    props = props.APP_USER_EMAIL_UPDATE_STATE
      ? {
          ...props,
          ...props.APP_USER_EMAIL_UPDATE_STATE,
          APP_STATE: APP_USER_EMAIL_UPDATE_STATE,
        }
      : props;
  }

  const fieldsObj = fields('Search');

  useEffect(() => {
    injectReducer(UI_SEARCH_STATE, HOFreducer(UI_SEARCH_STATE, fieldsObj));
    injectReducer(USER, HOFreducer(USER, {}));

    const query = getQueryString();

    if (query['activate-account-token']) {
      injectReducer(
        APP_ACTIVATE_ACCOUNT_STATE,
        HOFreducer(
          APP_ACTIVATE_ACCOUNT_STATE,
          appState(APP_ACTIVATE_ACCOUNT_STATE)
        )
      );
      props.onGet(APP_ACTIVATE_ACCOUNT_STATE, () => {}, query.token);
    }

    if (query['update-email-token']) {
      injectReducer(
        APP_USER_EMAIL_UPDATE_STATE,
        HOFreducer(
          APP_USER_EMAIL_UPDATE_STATE,
          appState(APP_USER_EMAIL_UPDATE_STATE)
        )
      );

      // no body to update email - patch
      injectReducer(
        'BLANK',
        HOFreducer('BLANK', {
          blank: {
            value: 'blank',
            dbProp: 'blank',
            validate: () => 'blank',
            validationFailed: 'blank',
          },
        })
      );

      props.onPatch(
        APP_USER_EMAIL_UPDATE_STATE,
        'BLANK',
        {},
        () => {},
        query.token,
        query.email
      );
    }

    return () => {
      ejectReducer(APP_USER_EMAIL_UPDATE_STATE);
    };
  }, []);

  useEffect(() => {
    if (props.USER?.user?.role === 'client') {
      injectReducer(
        APP_SHOPPING_CART_STATE,
        HOFreducer(APP_SHOPPING_CART_STATE, appState(APP_SHOPPING_CART_STATE))
      );
      injectReducer(SHOPPING_CART, HOFreducer(SHOPPING_CART, {}));

      if (!props.shoppingCart) props.onGet(APP_SHOPPING_CART_STATE);
    } else {
      ejectReducer(APP_SHOPPING_CART_STATE);
      ejectReducer(SHOPPING_CART);
    }
  }, [props.USER]);

  const history = useHistory();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (props.Search?.value.trim()) {
      if (window.location.hash === '#/search') {
        props.searchFunc();
      } else {
        history.push(SEARCH);
      }
    }
  };

  const onClickHandler = () => {
    setShowDropdown(!showDropdown);
  };

  const onShowMobileDropdown = () => setShowMobileDropdown(!showMobileDropdown);

  const logout = () => {
    setShowDropdown(false);
    localStorage.removeItem('USER');
    ejectReducer('USER');
  };

  const currentPath = window.location.hash.slice(1);

  return (
    <header className="header">
      <Link to={ROOT}>
        <picture className="header__logo">
          <LazyImg src="/assets/logo.png" alt="logo" logo />
        </picture>
      </Link>

      <form className="header__form" onSubmit={onSubmitHandler}>
        <InputField
          labelName="Search"
          placeholder="Search..."
          hideLabel={true}
          TYPE={UI_SEARCH_STATE}
          dbProp={fieldsObj['Search'].dbProp}
        />
        <Button
          style={{ padding: '.4rem' }}
          value={<img src={searchIcon} alt="search icon" />}
        />
      </form>

      <div className="header__buttons">
        {/* cart button will only show for clients */}
        {(!isAuth || isClient) && (
          <LinkButton
            to={isAuth ? CART : SIGNUP}
            dark={true}
            iconsrc={isAuth ? cartIcon : null}
            alt="cart icon"
          >
            {isAuth ? (
              <span className="cart-product-num">
                {props.shoppingCart ? props.shoppingCart.length : '-'}
              </span>
            ) : (
              'Signup'
            )}
          </LinkButton>
        )}

        {/* dashboard or admin panel button */}
        <LinkButton
          to={!isAuth ? LOGIN : !isClient ? ADMIN : DASHBOARD}
          iconsrc={isAuth ? userIcon : null}
          alt="user icon"
        >
          {isAuth ? user.firstName : 'Login'}
        </LinkButton>
      </div>

      {/* hamburgur button */}
      <Hamburgur active={showDropdown} onClickHandler={onClickHandler} />

      {showDropdown && (
        <div className="header__dropdown">
          {[...commonButtons, ...dropdownData(isAuth)].map(
            ({ value, path, iconsrc }) => (
              <LinkButton
                key={iconsrc + value}
                to={path}
                iconsrc={iconsrc}
                alt={iconsrc}
                nobg={currentPath !== path ? 'true' : ''}
                bgonhover={'true'}
                style={{ padding: '1rem', fontSize: '.9rem' }}
                onClick={value === 'Logout' ? logout : () => {}}
              >
                {value}
              </LinkButton>
            )
          )}
        </div>
      )}

      <div className="header__mobileDropdown">
        <div className="header__mobileDropdown__wrapper">
          <LinkButton
            to={ROOT}
            iconsrc={'/assets/overview icon.svg'}
            alt={'overview icon'}
            nobg={currentPath !== ROOT ? 'true' : ''}
            bgonhover={'true'}
            style={{ padding: '1.3rem', fontSize: '.9rem' }}
            center="true"
          >
            Home
          </LinkButton>

          {isAuth && (
            <LinkButton
              to={CART}
              iconsrc={'/assets/order icon.svg'}
              alt={'overview icon'}
              nobg={currentPath !== CART ? 'true' : ''}
              bgonhover={'true'}
              style={{ padding: '1.3rem', fontSize: '.9rem' }}
              center="true"
            >
              Cart
            </LinkButton>
          )}

          <div className="hamburgur-show">
            <Hamburgur
              active={showMobileDropdown}
              onClickHandler={onShowMobileDropdown}
            />
          </div>

          {showMobileDropdown && (
            <div className="header__mobileDropdownBox">
              {[
                ...commonButtons,
                ...dashboardLinks(isAuth),
                ...dropdownData(isAuth),
              ].map(({ value, path, iconsrc }) => (
                <LinkButton
                  key={iconsrc + value}
                  to={path}
                  iconsrc={iconsrc}
                  alt={iconsrc}
                  nobg={currentPath !== path ? 'true' : ''}
                  bgonhover={'true'}
                  style={{ padding: '1rem', fontSize: '.9rem' }}
                  onClick={value === 'Logout' ? logout : () => {}}
                >
                  {value}
                </LinkButton>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* modal */}
      {props.requestStatus && (
        <RequestStatusModalBg
          requestStatus={props.requestStatus}
          APP_STATE={props.APP_STATE}
        >
          {props.requestStatus === 'pending' ? (
            <SpinnerLoading />
          ) : (
            props.modalMsg(props.requestStatus, props.errorTag)
          )}
        </RequestStatusModalBg>
      )}
    </header>
  );
}

const mapStateToProps = ({
  USER,
  UI_SEARCH_STATE,
  APP_CATEGORY_STATE,
  SHOPPING_CART,
  APP_ACTIVATE_ACCOUNT_STATE,
  APP_USER_EMAIL_UPDATE_STATE,
}) => ({
  USER,
  ...UI_SEARCH_STATE,
  ...APP_CATEGORY_STATE,
  ...SHOPPING_CART,
  APP_ACTIVATE_ACCOUNT_STATE,
  APP_USER_EMAIL_UPDATE_STATE,
});

export default connect(mapStateToProps, { onGet, onPatch })(Header);
