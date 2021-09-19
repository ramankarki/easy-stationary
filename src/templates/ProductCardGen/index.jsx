import { useState } from 'react';

import ProductCard from '../ProductCard';
import './productCardGen.scss';

function ProductCardGen(props) {
  const parseWishlists = JSON.parse(localStorage.getItem('WISHLISTS')) || {};
  const [wishlists, setWishlists] = useState(parseWishlists);

  const saveWishlists = (productId, categoryName) => (event) => {
    event.preventDefault();
    setWishlists((prevState) => {
      let state = {
        ...prevState,
        [productId]: categoryName,
      };

      if (productId in prevState) delete state[productId];

      localStorage.setItem('WISHLISTS', JSON.stringify(state));
      return state;
    });
  };

  return (
    <div className="multipleProducts">
      {props.products?.map((product) => {
        let breakUrl = product.imageUrl[0].split('upload');
        breakUrl = breakUrl[0] + 'upload/ar_3:2,c_fill' + breakUrl[1];

        return (
          <ProductCard
            key={product.productId}
            {...product}
            imageUrl={breakUrl}
            setWishlists={saveWishlists(
              product.productId,
              product.categoryName
            )}
            wishlists={wishlists}
          />
        );
      })}
    </div>
  );
}

export default ProductCardGen;
