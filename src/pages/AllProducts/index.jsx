import { APP_ALL_PRODUCTS_STATE } from '../../actions/constants';

import MultipleProductsPage from '../../templates/MultipleProductsPage';

function AllProducts() {
  return (
    <MultipleProductsPage
      APP_MULTIPLE_PRODUCTS_STATE={APP_ALL_PRODUCTS_STATE}
    />
  );
}

export default AllProducts;
