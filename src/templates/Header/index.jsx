import { connect } from 'react-redux';

import { UI_SEARCH_STATE } from '../../actions/constants';
import fields from '../../utils/fields';
import { injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';
import { LOGIN, SIGNUP, CART, ADMIN, DASHBOARD } from '../../Routes/contants';

import LazyImg from '../../components/LazyImg';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import LinkButton from '../../components/LinkButton';
import Hamburgur from '../../components/Hamburgur';

import searchIcon from './search icon.svg';
import cartIcon from './cart icon.svg';
import userIcon from './user icon.svg';
import './header.scss';

function Header(props) {
  const user = props.USER?.user;
  const isAuth = !!user;
  const isClient = user?.role === 'client';

  const fieldsObj = fields('Search');
  injectReducer(UI_SEARCH_STATE, HOFreducer(UI_SEARCH_STATE, fieldsObj));

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <header className="header">
      <picture className="header__logo">
        <LazyImg logo src="/assets/Easy-Stationary-Logo.webp" alt="logo" />
      </picture>

      <form className="header__form" onSubmit={onSubmitHandler}>
        <InputField
          labelName="Search"
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
            dark="true"
            iconsrc={isAuth ? cartIcon : null}
            alt="cart icon"
          >
            {isAuth ? <span className="cart-product-num">90</span> : 'Signup'}
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
      {isAuth && <Hamburgur />}
    </header>
  );
}

const mapStateToProps = ({ USER }) => ({ USER });

export default connect(mapStateToProps, {})(Header);
