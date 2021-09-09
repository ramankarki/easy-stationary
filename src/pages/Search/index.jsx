import { APP_SEARCH_STATE } from '../../actions/constants';

import MultipleProductsPage from '../../templates/MultipleProductsPage';

function Search() {
  return (
    <MultipleProductsPage APP_MULTIPLE_PRODUCTS_STATE={APP_SEARCH_STATE} />
  );
}

export default Search;
