import { Link } from 'react-router-dom';

import RatingStars from '../../components/RatingStars';

import './productCardGen.scss';

function ProductCardGen(props) {
  return (
    <div className="multipleProducts">
      {props.products?.map((product) => {
        const breakUrl = product.imageUrl[0].split('upload');
        product.imageUrl[0] =
          breakUrl[0] + 'upload/ar_3:2,c_fill' + breakUrl[1];

        const blankFunc = () => {};

        return (
          <Link
            onClick={props.onClick || blankFunc}
            to={`/${product.categoryName}/${product.productId}`}
            style={{ textDecoration: 'none' }}
            key={product.productId}
          >
            <span className="multipleProducts__product">
              <picture>
                <img src={product.imageUrl[0]} alt="product" />
              </picture>
              <RatingStars ratings={product.ratings} peopleNumber="true" />
              <h3>{product.productName}</h3>
              <p>Rs. {product.price}</p>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductCardGen;
