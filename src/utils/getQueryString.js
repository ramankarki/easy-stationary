// returns query string whatever is after hash url
const queryString = () => {
  const query = {};
  window.location.hash
    .split('?')[1]
    ?.split('&')
    .forEach((string) => {
      let [key, value] = string.split('=');
      query[key] = value;
    });
  return query;
};

export default queryString;
