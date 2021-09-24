import { create } from 'axios';

function API() {
  let baseURL = process.env.REACT_APP_API_1;

  const day = new Date().getDate();
  if (day === 1 || day > 20) baseURL = process.env.REACT_APP_API_2;

  if (process.env.NODE_ENV !== 'production') baseURL = 'http://localhost:8000';

  return create({
    baseURL,
    headers: {
      authorization:
        'Bearer ' + JSON.parse(localStorage.getItem('USER'))?.token,
    },
  });
}

export default API;
