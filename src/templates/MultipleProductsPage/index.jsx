import { connect } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

import onGet from '../../actions/onGet';
import {
  APP_CATEGORY_STATE,
  CATEGORY,
  MULTIPLE_PRODUCTS,
  RESET,
} from '../../actions/constants';
import { injectReducer, ejectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';
import HOFdomainReducer from '../../reducers/HOFdomainReducer';
import appState from '../../appState';
import { ROOT } from '../../Routes/contants';
import { useIntersection } from '../../utils/useIntersection';
import resetAppState from '../../actions/resetAppState';

import Header from '../../templates/Header';
import BreadCrumb from '../../components/BreadCrumb';
import HeroSection from '../../templates/HeroSection';
import SpinnerLoading from '../../components/SpinnerLoading';
import ProductCardGen from '../../templates/ProductCardGen';
import LinkButton from '../../components/LinkButton';
import Footer from '../Footer';

import './multipleProductsPage.scss';

function MultipleProductsPage(props) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [showSpinner, setShowSpinner] = useState(true);
  const [giftCardData, setGiftCardData] = useState(null);
  const [showGiftCard, setShowGiftCard] = useState(true);

  const onGiftCardClose = () => setShowGiftCard(false);

  const spinnerRef = useRef();

  let { categories, products, APP_MULTIPLE_PRODUCTS_STATE, Search } = props;

  const [history, setHistory] = useState(window.location.hash);

  const resetMultipleProducts = () => {
    setShowSpinner(true);
    setPage(1);
    props.resetAppState(MULTIPLE_PRODUCTS + RESET, {});
  };

  const refetchData = () => {
    setHistory(window.location.hash);
    resetMultipleProducts();
  };

  const popStateListener = () => {
    const path = window.location.hash.split('/')[1];
    if (/auth|admin|landing-page|search|cart|dashboard/.test(path)) return;
    refetchData();
  };

  useEffect(() => {
    // get gift card data from notion
    fetch(
      'https://notion-api.splitbee.io/v1/page/9fab1eab3dce4a038bb95e885cdb9411'
    )
      .then((res) => res.json())
      .then((data) => {
        const keys = Object.keys(data);
        const text = data[keys[1]].value.properties.title[0][0];
        const image = `https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F${
          data[keys[2]].value.file_ids[0]
        }%2FUntitled.png?table=block&id=${keys[2]}&cache=v2`;

        setGiftCardData({ text, image });
      });

    // inject category
    injectReducer(
      CATEGORY,
      HOFdomainReducer(CATEGORY, 'categories', 'category')
    );

    const appCategoryState = appState(APP_CATEGORY_STATE);
    appCategoryState.searchFunc = refetchData;
    injectReducer(
      APP_CATEGORY_STATE,
      HOFreducer(APP_CATEGORY_STATE, appCategoryState)
    );

    props.onGet(APP_CATEGORY_STATE);

    window.addEventListener('popstate', popStateListener);

    return () => {
      ejectReducer(CATEGORY);
      ejectReducer(APP_CATEGORY_STATE);

      window.removeEventListener('popstate', popStateListener);
    };
  }, []);

  useEffect(() => {
    // inject all products
    injectReducer(
      APP_MULTIPLE_PRODUCTS_STATE,
      HOFreducer(
        APP_MULTIPLE_PRODUCTS_STATE,
        appState(APP_MULTIPLE_PRODUCTS_STATE)
      )
    );
    injectReducer(
      MULTIPLE_PRODUCTS,
      HOFdomainReducer(MULTIPLE_PRODUCTS, 'products')
    );

    return () => {
      ejectReducer(APP_MULTIPLE_PRODUCTS_STATE);
      ejectReducer(MULTIPLE_PRODUCTS);
    };
  }, [history]);

  // filter option onChange
  // reset multiple products
  // set page value to 1
  // set showSpinner to true
  useEffect(() => {
    if (!products) return;

    resetMultipleProducts();
  }, [sort]);

  const noOfProducts = categories?.reduce(
    (acc, val) => acc + val.noOfProducts,
    0
  );

  if (categories && categories[0]?.categoryName !== 'All products')
    categories?.unshift({ noOfProducts, categoryName: 'All products' });

  const currentCategory = window.location.hash.split('/')[1] || 'All products';

  const loadAllProducts = () => {
    if (showSpinner) {
      props.onGet(
        APP_MULTIPLE_PRODUCTS_STATE,
        (data) => {
          setShowSpinner(!!data.products.length);
          setPage(page + 1);
        },
        page,
        sort,
        Search?.value
      );
    }
  };

  useIntersection(spinnerRef, loadAllProducts, products);

  const onFilterChange = (event) => setSort(event.target.value);

  return (
    <div className="allProducts">
      <Header />
      <BreadCrumb />

      {/* hero section */}
      <HeroSection
        imgUrl="url('/assets/hero image.webp')"
        heading="Get the products you want"
        text="Search for the products you want by simplying using search box above
        and typing keywords, or by clicking the category buttons of your
        products below."
      />

      {/* gift card */}
      {showGiftCard && giftCardData && (
        <div className="allProducts__giftCard">
          <picture
            style={{
              backgroundImage: `url('${giftCardData?.image}')`,
            }}
          ></picture>
          <p>{giftCardData?.text}</p>
          <button onClick={onGiftCardClose}>
            <img src="/assets/exit icon.svg" alt="exit icon" />
          </button>
        </div>
      )}

      {/* category bar with filter button aside */}
      <div className="allProducts__categoryFilterBar">
        <div className="allProducts__categoryBar">
          <div className="allProducts__categoryBarWrapper">
            {categories?.map(({ noOfProducts, categoryName }, index) => (
              <LinkButton
                key={categoryName}
                to={!index ? ROOT : '/' + categoryName}
                dark={currentCategory === categoryName}
              >
                {categoryName}
                <span>({noOfProducts})</span>
              </LinkButton>
            ))}
          </div>
        </div>
        <label className="allProducts__filterBtn">
          <span>Sort by:</span>
          <select onChange={onFilterChange}>
            <option value="">Best match</option>
            <option value="price">Price low to high</option>
            <option value="-price">Price high to low</option>
          </select>
        </label>
      </div>

      {/* search result message */}
      {currentCategory === 'search' ? (
        <p className="searchResultMsg">Search results for "{Search?.value}"</p>
      ) : (
        ''
      )}

      {/* products grid */}
      <ProductCardGen products={products} />

      {/* spinner */}
      {showSpinner && (
        <div ref={spinnerRef} className="spinnerWrapper">
          <SpinnerLoading />
        </div>
      )}

      <Footer />
    </div>
  );
}

const mapStateToProps = ({ CATEGORY, MULTIPLE_PRODUCTS, UI_SEARCH_STATE }) => ({
  ...CATEGORY,
  ...MULTIPLE_PRODUCTS,
  ...UI_SEARCH_STATE,
});

export default connect(mapStateToProps, { onGet, resetAppState })(
  MultipleProductsPage
);
