import { Link } from 'react-router-dom';

import classes from '../../utils/classes';

import RatingStars from '../../components/RatingStars';

import './productCard.scss';

function ProductCard(props) {
  const productCardClass = classes('productCard', {
    'productCard-small': props.small,
  });

  const blankFunc = () => {};
  return (
    <Link
      onClick={props.onClick || blankFunc}
      to={`/${props.categoryName}/${props.productId}`}
      style={{ textDecoration: 'none' }}
    >
      <span className={productCardClass}>
        <picture>
          <img src={props.imageUrl} alt="product" />
        </picture>
        {props.ratings && (
          <RatingStars ratings={props.ratings} peopleNumber="true" />
        )}
        <h3>{props.productName}</h3>
        {props.quantity && <span>Quantity: {props.quantity}</span>}
        <p>Rs. {props.price}</p>
      </span>
    </Link>
  );
}

export default ProductCard;
