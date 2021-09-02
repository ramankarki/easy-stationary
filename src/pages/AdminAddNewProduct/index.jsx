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
import onChangeArrayOrObj from '../../actions/onChangeArrayOrObj';
import onArrayValueAdd from '../../actions/onArrayValueAdd';
import onObjValueAdd from '../../actions/onObjValueAdd';
import onAddNewProduct from '../../actions/onAddNewProduct';
import onArrElementDel from '../../actions/onArrElementDel';
import classes from '../../utils/classes';

import AdminPageTemplate from '../../templates/AdminPageTemplate';
import Button from '../../components/Button';
import InputField from '../../components/InputField';

import './adminAddNewProduct.scss';

function AdminAddNewProduct(props) {
  const { categories } = props;

  const productDescription = props['Product description'];

  const productQualities = props['Product qualities'];
  const lastQualityIndex = productQualities?.value.length - 1;
  const lastQualityValue = productQualities?.value[lastQualityIndex];

  const productSpecificationKey = props['Product specification key'];
  const lastSpecificationKeyIndex = productSpecificationKey?.value.length - 1;
  const lastSpecificationKeyValue =
    productSpecificationKey?.value[lastSpecificationKeyIndex];

  const productSpecificationValue = props['Product specification value'];
  const lastSpecificationValueIndex =
    productSpecificationValue?.value.length - 1;
  const lastSpecificationValueVal =
    productSpecificationValue?.value[lastSpecificationValueIndex];

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
    'Product specification key',
    'Product specification value'
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

  const onDeSelectImage = (fieldName) => () => {
    props.onChangeAndBlur(UI_SINGLE_PRODUCT_STATE, fieldName);
  };

  const onChangeHandler = (fieldName) => (event) => {
    props.onChangeAndBlur(
      UI_SINGLE_PRODUCT_STATE,
      fieldName,
      event.target.value
    );
  };

  const onBlurHandler = (fieldName) => (event) => {
    props.onChangeAndBlur(
      UI_SINGLE_PRODUCT_STATE,
      fieldName,
      event.target.value,
      undefined,
      'onBlur'
    );
  };

  const onArrayOrObjChange = (fieldName, key) => (event) => {
    props.onChangeArrayOrObj(
      UI_SINGLE_PRODUCT_STATE,
      fieldName,
      key,
      event.target.value
    );
  };

  const addArray = (fieldName) => () => {
    props.onArrayValueAdd(UI_SINGLE_PRODUCT_STATE, fieldName);
  };

  const addSpecification = (fieldName) => () => {
    props.onObjValueAdd(UI_SINGLE_PRODUCT_STATE, fieldName);
  };

  const onSumitHandler = (event) => {
    event.preventDefault();
  };

  const inputClass = classes('inputWrapper', {
    'inputWrapper-error': productDescription?.validationFailed,
  });

  const onProductQualityDel = (index) => () =>
    props.onArrElementDel('Product qualities', index);

  const onProductSpecificationDel = (index) => () => {
    props.onArrElementDel('Product specification key', index);
    props.onArrElementDel('Product specification value', index);
  };

  if (!props.requestStatus)
    props = { ...props, ...props.APP_SINGLE_PRODUCT_STATE };

  return (
    <AdminPageTemplate
      {...props}
      heading="Add new product"
      APP_STATE={APP_SINGLE_PRODUCT_STATE}
    >
      <form onSubmit={onSumitHandler} className="product">
        {/* input type file for selecting images */}
        {Object.keys(imageFields).map((fieldName, index) => (
          <div key={fieldName} className="product__image">
            <label className="product__image">
              <input
                required
                name={'image' + index}
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
                type="button"
                style={{ width: '100%' }}
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
            name="categoryName"
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

        {/* product description textarea field */}
        <label className="label productDescription">
          <p className="label__name">
            Product description{' '}
            {productDescription?.validationFailed ? (
              <span className="label__validationMsg">
                &nbsp; *{productDescription.validationMsg}
              </span>
            ) : (
              ''
            )}
          </p>
          <div className={inputClass}>
            <textarea
              required
              name="productDescription"
              onChange={onChangeHandler('Product description')}
              onBlur={onBlurHandler('Product description')}
            ></textarea>
          </div>
        </label>

        {/* product qualities, array of input text fields */}
        <label className="label productQualities">
          <p className="label__name">Product qualities</p>
          <div className="productQualities__list">
            <ul>
              {productQualities?.value.map((val, index) => {
                if (index === lastQualityIndex) return undefined;

                return (
                  <li key={val + Date.now()}>
                    <input
                      required
                      name={'productQuality' + index}
                      className="label__field"
                      type="text"
                      value={val}
                      onChange={onArrayOrObjChange('Product qualities', index)}
                    />
                    <Button
                      type="button"
                      value="DEL"
                      danger="true"
                      small="true"
                      onClick={onProductQualityDel(index)}
                    />
                  </li>
                );
              })}
            </ul>
            <div className="productQualities__addQuality">
              <input
                className="label__field"
                type="text"
                value={lastQualityValue}
                onChange={onArrayOrObjChange(
                  'Product qualities',
                  lastQualityIndex
                )}
              />
              <Button
                value="Add"
                small="true"
                type="button"
                onClick={addArray('Product qualities')}
              />
            </div>
          </div>
        </label>

        {/* product specification, double array of input text fields */}
        <label className="label productSpecification">
          <p className="label__name">Product specification</p>
          <div className="productSpecification__list">
            {productSpecificationKey?.value.map((val, index, arr) => {
              if (index === arr.length - 1) return undefined;

              return (
                <div
                  className="productSpecification__list__child"
                  key={val + Date.now()}
                >
                  <input
                    required
                    name="key"
                    className="label__field"
                    type="text"
                    value={val}
                    onChange={onArrayOrObjChange(
                      'Product specification key',
                      index
                    )}
                  />
                  <input
                    required
                    name="value"
                    className="label__field"
                    type="text"
                    value={productSpecificationValue?.value[index]}
                    onChange={onArrayOrObjChange(
                      'Product specification value',
                      index
                    )}
                  />
                  <Button
                    type="button"
                    value="DEL"
                    danger="true"
                    small="true"
                    onClick={onProductSpecificationDel(index)}
                  />
                </div>
              );
            })}
            <div className="productSpecification__addSpecification">
              <input
                className="label__field"
                type="text"
                value={lastSpecificationKeyValue}
                onChange={onArrayOrObjChange(
                  'Product specification key',
                  lastSpecificationKeyIndex
                )}
              />
              <input
                className="label__field"
                type="text"
                value={lastSpecificationValueVal}
                onChange={onArrayOrObjChange(
                  'Product specification value',
                  lastSpecificationValueIndex
                )}
              />
              <Button
                value="Add"
                small="true"
                type="button"
                onClick={addSpecification('Product specification')}
              />
            </div>
          </div>
        </label>

        <Button
          onClick={props.onAddNewProduct}
          style={{ gridColumn: 'span 3' }}
          value="Create product"
        />
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

export default connect(mapStateToProps, {
  onChangeAndBlur,
  onGet,
  onChangeArrayOrObj,
  onArrayValueAdd,
  onObjValueAdd,
  onAddNewProduct,
  onArrElementDel,
})(AdminAddNewProduct);
