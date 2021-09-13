import { Link } from 'react-router-dom';

import RatingStars from '../../components/RatingStars';

import './productCard.scss';

function ProductCard(props) {
  const blankFunc = () => {};
  return (
    <Link
      onClick={props.onClick || blankFunc}
      to={`/${props.categoryName}/${props.productId}`}
      style={{ textDecoration: 'none' }}
    >
      <span className="productCard">
        <picture>
          <img src={props.imageUrl} alt="product" />
        </picture>
        {props.ratings && (
          <RatingStars ratings={props.ratings} peopleNumber="true" />
        )}
        <h3>{props.productName}</h3>
        <p>Rs. {props.price}</p>
      </span>
    </Link>
  );
}

export default ProductCard;
