import { create } from 'axios';

export default create({
  baseURL: process.env.REACT_APP_API_1,
  headers: {
    authorization: 'Bearer ' + JSON.parse(localStorage.getItem('USER')).token,
  },
});
