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
