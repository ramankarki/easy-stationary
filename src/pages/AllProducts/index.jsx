import Header from '../../templates/Header';
import SpinnerLoading from '../../components/SpinnerLoading';
import BreadCrumb from '../../components/BreadCrumb';

import './allProducts.scss';

function AllProducts() {
  return (
    <div className="allProducts">
      <Header />
      <BreadCrumb />

      <div className="allProducts__heroSection">
        <picture
          style={{ backgroundImage: `url('/assets/hero image.webp')` }}
        ></picture>
        <div className="allProducts__heroContent">
          <h1>Get the products you want</h1>
          <p>
            Search for the products you want by simplying using search box above
            and typing keywords, or by clicking the category buttons of your
            products.
          </p>
        </div>
      </div>

      {/* spinner */}
      <div className="spinnerWrapper">
        <SpinnerLoading />
      </div>
    </div>
  );
}

export default AllProducts;
