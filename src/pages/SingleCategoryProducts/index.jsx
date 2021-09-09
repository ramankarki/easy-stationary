import { APP_SINGLE_CATEGORY_PRODUCTS_STATE } from '../../actions/constants';

import MultipleProductsPage from '../../templates/MultipleProductsPage';

function SingleCategoryProducts() {
  return (
    <MultipleProductsPage
      APP_MULTIPLE_PRODUCTS_STATE={APP_SINGLE_CATEGORY_PRODUCTS_STATE}
    />
  );
}

export default SingleCategoryProducts;
