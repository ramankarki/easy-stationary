import {
  isTextBox,
  _isEmail,
  isName,
  isPhoneNumber,
  isReTypePassword,
} from './validators';

const fieldsObject = {
  'First name': {
    validate: isName,
    validationMsg: 'Please enter your name!',
    dbProp: 'firstName',
  },
  'Last name': {
    validate: isName,
    validationMsg: 'Please enter your name!',
    dbProp: 'lastName',
  },
  'Phone number': {
    validate: isPhoneNumber,
    validationMsg: 'Please enter valid number!',
    dbProp: 'phoneNumber',
  },
  'Full address': {
    validate: isTextBox,
    min: 2,
    max: 999999,
    validationMsg: 'Please enter your address!',
    dbProp: 'fullAddress',
  },
  Email: {
    validate: _isEmail,
    validationMsg: 'Please enter valid email!',
    dbProp: 'email',
  },
  Password: {
    validate: isTextBox,
    min: 12,
    max: 999999,
    validationMsg: 'Length should be more than 12!',
    dbProp: 'password',
  },
  'Current password': {
    validate: isTextBox,
    min: 12,
    max: 999999,
    validationMsg: 'Length should be more than 12!',
    dbProp: 'password',
  },
  'New password': {
    validate: isTextBox,
    min: 12,
    max: 999999,
    validationMsg: 'Length should be more than 12!',
    dbProp: 'newPassword',
  },
  'Re-type password': {
    validate: isReTypePassword,
    validationMsg: "Passwords doesn't match!",
    dbProp: 'reTypePassword',
  },
  Search: {
    min: 2,
    max: 999999,
    validate: isTextBox,
    dbProp: 'q',
  },
  'Add new category': {
    min: 2,
    max: 999999,
    validate: isTextBox,
    dbProp: 'categoryName',
  },
  'Critical modal': {
    min: 1,
    max: 999999,
    validate: isTextBox,
    dbProp: 'dull, wont be used',
  },
  'First image': {
    dbProp: 'imageUrl',
  },
  'Second image': {
    dbProp: 'imageUrl',
  },
  'Third image': {
    dbProp: 'imageUrl',
  },
  'Product name': {
    min: 2,
    max: 999999,
    validate: isTextBox,
    dbProp: 'productName',
    validationMsg: 'Product name is required!',
  },
  'Brand name': {
    min: 2,
    max: 999999,
    validate: isTextBox,
    dbProp: 'brandName',
    validationMsg: 'Brand name is required!',
  },
  'Price (Rs.)': {
    min: 1,
    max: 999999,
    validate: isTextBox,
    dbProp: 'price',
    validationMsg: 'Price is required!',
    valueType: Number,
  },
  Quantity: {
    min: 1,
    max: 999999,
    validate: isTextBox,
    dbProp: 'quantity',
    validationMsg: 'Quantity is required!',
    valueType: Number,
  },
  'Category name': {
    dbProp: 'categoryName',
  },
  'Product description': {
    min: 160,
    max: 999999,
    validate: isTextBox,
    dbProp: 'productDescription',
    validationMsg: 'Min 160 characters is required!',
  },
  'Product qualities': {
    value: [''],
    dbProp: 'productQualities',
  },
  'Product specification key': {
    value: [''],
    dbProp: 'productSpecification',
  },
  'Product specification value': {
    value: [''],
    dbProp: 'productSpecification',
  },
  Ratings: {
    dbProp: 'ratings',
    value: 3,
    validate: () => true,
  },
  Description: {
    dbProp: 'description',
    min: 2,
    max: 999999,
    validate: isTextBox,
  },
  ProductId: {
    dbProp: 'productId',
    validate: () => true,
  },
  CategoryName: {
    dbProp: 'categoryName',
    validate: () => true,
  },
  OrderProducts: {
    dbProp: 'products',
    validate: () => true,
  },
};

const fields = (...args) => {
  const requestedFields = {};
  args.forEach((fieldName) => {
    requestedFields[fieldName] = {
      value: '',
      validationFailed: false,
      ...fieldsObject[fieldName],
    };
  });
  return requestedFields;
};

export default fields;
