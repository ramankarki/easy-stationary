import { useState } from 'react';

/**
 * @usage const [wishlists, setWishlists] = useWishlists();
 * @description 'wishlists' contains object {productId: categoryName}
 * @returns [wishlists, setFunc]
 */
function useWishlists() {
  const parseWishlists = JSON.parse(localStorage.getItem('WISHLISTS')) || {};
  const [wishlists, setWishlists] = useState(parseWishlists);

  const saveWishlists = (productId, categoryName) => (event) => {
    event.preventDefault();
    setWishlists((prevState) => {
      const parseWishlists =
        JSON.parse(localStorage.getItem('WISHLISTS')) || {};
      let state = {
        ...parseWishlists,
        ...prevState,
        [productId]: categoryName,
      };

      if (productId in prevState) delete state[productId];

      localStorage.setItem('WISHLISTS', JSON.stringify(state));
      return state;
    });
  };

  return [wishlists, saveWishlists];
}

export default useWishlists;
