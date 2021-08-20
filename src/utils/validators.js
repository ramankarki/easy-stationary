import isEmail from 'validator/es/lib/isEmail';

// Returns Boolean values.
export function isTextBox(value) {
  const regex = new RegExp(`^.{${this.min},${this.max}}$`);
  return regex.test(value);
}

export const isName = (value) => /^[a-z]+$/i.test(value);

export const _isEmail = (value) => isEmail(value);

export const isPhoneNumber = (value) => {
  if (!value.startsWith('98')) return false;
  if (value.length !== 10) return false;
  return /^[0-9]+$/.test(value);
};

export const isReTypePassword = (value, password) => value === password;
