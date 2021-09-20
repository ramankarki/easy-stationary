import { Link } from 'react-router-dom';

import classes from '../../utils/classes';
import useWishlists from '../../utils/useWishlists';

import RatingStars from '../../components/RatingStars';

import wishlistActive from './wishlist-active.svg';
import wishlistInActive from './wishlist-inactive.svg';

import './productCard.scss';

function ProductCard(props) {
  const [wishlists, setWishlists] = useWishlists();
  console.log(wishlists);

  const productCardClass = classes('productCard', {
    'productCard-small': props.small,
  });

  return (
    <Link
      to={`/${props.categoryName}/${props.productId}`}
      style={{ textDecoration: 'none' }}
    >
      <span className={productCardClass}>
        <picture>
          {props.wishlists && (
            <img
              onClick={setWishlists(props.productId, props.categoryName)}
              className="wishlist"
              src={
                props.productId in wishlists ? wishlistActive : wishlistInActive
              }
              alt="heart icon"
            />
          )}
          <img className="product" src={props.imageUrl} alt="product" />
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
