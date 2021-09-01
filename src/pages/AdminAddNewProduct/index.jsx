import { connect } from 'react-redux';
import { useEffect } from 'react';

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
import Button from '../../components/Button';
import InputField from '../../components/InputField';

import './adminAddNewProduct.scss';

function AdminAddNewProduct(props) {
  const { categories } = props;
  const imageFields = fields('First image', 'Second image', 'Third image');
  const commonInputFields = fields(
    'Product name',
    'Brand name',
    'Quantity',
    'Price (Rs.)'
  );
  const unCommonFields = fields(
    'Category name',
    'Product description',
    'Product qualities',
    'Product specification'
  );

  // inject category
  useEffect(() => {
    injectReducer(
      APP_CATEGORY_STATE,
      HOFreducer(APP_CATEGORY_STATE, appState(APP_CATEGORY_STATE))
    );
    injectReducer(
      CATEGORY,
      HOFdomainReducer(CATEGORY, 'categories', 'category', 'categoryName')
    );

    if (!categories) props.onGet(APP_CATEGORY_STATE);
  }, []);

  // inject single product
  useEffect(() => {
    injectReducer(SINGLE_PRODUCT, HOFreducer(SINGLE_PRODUCT, {}));
    injectReducer(
      APP_SINGLE_PRODUCT_STATE,
      HOFreducer(APP_SINGLE_PRODUCT_STATE, appState(APP_SINGLE_PRODUCT_STATE))
    );
    injectReducer(
      UI_SINGLE_PRODUCT_STATE,
      HOFreducer(UI_SINGLE_PRODUCT_STATE, {
        ...imageFields,
        ...commonInputFields,
        ...unCommonFields,
      })
    );
  }, []);

  const onSelectImage = (fieldName) => (event) => {
    props.onChangeAndBlur(
      UI_SINGLE_PRODUCT_STATE,
      fieldName,
      event.target.files[0]
    );
  };

  const onDeSelectImage = (fieldName) => (event) => {
    props.onChangeAndBlur(UI_SINGLE_PRODUCT_STATE, fieldName);
  };

  const onChangeHandler = (fieldName) => (event) => {
    props.onChangeAndBlur(
      UI_SINGLE_PRODUCT_STATE,
      fieldName,
      event.target.value
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
        {/* input type file for selecting images */}
        {Object.keys(imageFields).map((fieldName) => (
          <div key={fieldName} className="product__image">
            <label className="product__image">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={onSelectImage(fieldName)}
              />
              <img
                src={
                  props[fieldName]?.base64 || '/assets/image placeholder.svg'
                }
                alt="placeholder"
              />
              {!props[fieldName]?.base64 && <p>Select image</p>}
            </label>
            {props[fieldName]?.base64 && (
              <Button
                onClick={onDeSelectImage(fieldName)}
                value="Clear image"
                small="true"
                danger="true"
              />
            )}
          </div>
        ))}

        {/* common input fields */}
        {Object.keys(commonInputFields).map((fieldName) => (
          <InputField
            key={fieldName}
            TYPE={UI_SINGLE_PRODUCT_STATE}
            labelName={fieldName}
            dbProp={commonInputFields[fieldName].dbProp}
          />
        ))}

        {/* category field with option type */}
        <label className="label categoryName">
          <p className="label__name">Category name</p>
          <select
            onChange={onChangeHandler('Category name')}
            required
            className="label__field"
          >
            <option selected disabled value="">
              Select category
            </option>
            {categories?.map(({ categoryName }) => (
              <option key={categoryName} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>
        </label>
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
