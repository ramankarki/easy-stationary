import {
  isTextBox,
  _isEmail,
  isName,
  isPhoneNumber,
  isReTypePassword,
} from './validators';

const fieldsObject = {
  'First name': {
    isName,
    validationMsg: 'Please enter your name!',
    dbProp: 'firstName',
  },
  'Last name': {
    isName,
    validationMsg: 'Please enter your name!',
    dbProp: 'lastName',
  },
  'Phone number': {
    isPhoneNumber,
    validationMsg: 'Please enter valid phone number!',
    dbProp: 'phoneNumber',
  },
  'Full address': {
    isTextBox,
    min: 2,
    max: 999999,
    validationMsg: 'Please enter your address!',
    dbProp: 'fullAddress',
  },
  Email: {
    _isEmail,
    validationMsg: 'Please enter valid email!',
    dbProp: 'email',
  },
  Password: {
    isTextBox,
    min: 12,
    max: 999999,
    validationMsg: 'Length should be more than 12!',
    dbProp: 'password',
  },
  'Re-type password': {
    isReTypePassword,
    validationMsg: "Passwords doesn't match!",
    dbProp: 'reTypePassword',
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
