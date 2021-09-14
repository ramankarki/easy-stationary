import { create } from 'axios';

function API() {
  return create({
    baseURL: process.env.REACT_APP_API_1,
    headers: {
      authorization:
        'Bearer ' + JSON.parse(localStorage.getItem('USER'))?.token,
    },
  });
}

export default API;
