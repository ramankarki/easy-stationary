import { connect } from 'react-redux';

import {
  UI_SINGLE_PRODUCT_STATE,
  APP_SINGLE_PRODUCT_STATE,
  SINGLE_PRODUCT,
  CATEGORY,
  APP_CATEGORY_STATE,
} from '../../actions/constants';
import { injectReducer } from '../../utils/dynamicReducers';
import HOFreducer from '../../reducers/HOFreducer';
import HOFdomainReducer from '../../reducers/HOFdomainReducer';
import appState from '../../appState';
import onGet from '../../actions/onGet';
import fields from '../../utils/fields';
import onChangeAndBlur from '../../actions/onChangeAndBlur';

import AdminPageTemplate from '../../templates/AdminPageTemplate';
import LazyImg from '../../components/LazyImg';

import './adminAddNewProduct.scss';

function AdminAddNewProduct(props) {
  const { categories } = props;
  const imageFields = fields('First image', 'Second image', 'Third image');

  // inject category
  injectReducer(
    APP_CATEGORY_STATE,
    HOFreducer(APP_CATEGORY_STATE, appState(APP_CATEGORY_STATE))
  );
  injectReducer(
    CATEGORY,
    HOFdomainReducer(CATEGORY, 'categories', 'category', 'categoryName')
  );

  if (!categories) props.onGet(APP_CATEGORY_STATE);

  // inject single product
  injectReducer(SINGLE_PRODUCT, HOFreducer(SINGLE_PRODUCT, {}));
  injectReducer(
    APP_SINGLE_PRODUCT_STATE,
    HOFreducer(APP_SINGLE_PRODUCT_STATE, appState(APP_SINGLE_PRODUCT_STATE))
  );
  injectReducer(
    UI_SINGLE_PRODUCT_STATE,
    HOFreducer(UI_SINGLE_PRODUCT_STATE, { ...imageFields })
  );

  const onImageChange = (fieldName) => (event) => {
    props.onChangeAndBlur(
      UI_SINGLE_PRODUCT_STATE,
      fieldName,
      event.target.files[0]
    );
  };

  const onSumitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <AdminPageTemplate
      {...props}
      heading="Add new product"
      APP_STATE={APP_SINGLE_PRODUCT_STATE}
    >
      <form onSubmit={onSumitHandler} className="product">
        {Object.keys(imageFields).map((fieldName) => (
          <label className="product__image">
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={onImageChange(fieldName)}
            />
            <img
              src={props[fieldName]?.base64 || '/assets/image placeholder.svg'}
              alt="placeholder"
            />
            <p>Upload</p>
          </label>
        ))}
      </form>
    </AdminPageTemplate>
  );
}

const mapStateToProps = ({
  CATEGORY,
  APP_CATEGORY_STATE,
  UI_SINGLE_PRODUCT_STATE,
  APP_SINGLE_PRODUCT_STATE,
}) => ({
  ...CATEGORY,
  ...APP_CATEGORY_STATE,
  ...UI_SINGLE_PRODUCT_STATE,
  APP_SINGLE_PRODUCT_STATE,
});

export default connect(mapStateToProps, { onChangeAndBlur, onGet })(
  AdminAddNewProduct
);

//   imageUrl: [],
//   productName: {
//     type: String,
//     trim: true,
//     required: [true, 'productName is required!'],
//   },
//   productId: {
//     type: String,
//     required: [true, 'productId is required!'],
//   },
//   categoryName: {
//     type: String,
//     trim: true,
//     required: [true, 'categoryName is required!'],
//   },
//   brandName: {
//     type: String,
//     trim: true,
//     required: [true, 'brandName is required!'],
//   },
//   price: {
//     type: Number,
//     required: [true, 'price is required!'],
//   },
//   quantity: {
//     type: Number,
//     required: [true, 'quantity is required!'],
//   },
//   productDescription: {
//     type: String,
//     trim: true,
//     required: [true, 'productDescription is required!'],
//   },
//   productQualities: [String],
//   productSpecification: Object,
//   ratings: {
//     1: { type: Number, default: 0 },
//     2: { type: Number, default: 0 },
//     3: { type: Number, default: 0 },
//     4: { type: Number, default: 0 },
//     5: { type: Number, default: 0 },
//   },
//   noOfPurchases: {
//     type: Number,
//     default: 0,
//   },
