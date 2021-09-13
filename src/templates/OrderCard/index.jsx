import ProductCard from '../ProductCard';
import Button from '../../components/Button';

import './orderCard.scss';

function OrderCard(props) {
  const totalAmount = props.products?.reduce(
    (acc, val) => acc + val.quantity * val.price,
    0
  );

  return (
    <div className="orderCard">
      {/* card details */}
      <div className="orderCard__cardDetails">
        <span>
          Total: <b>Rs. {totalAmount}</b>
        </span>
        <span>
          Order ID: <b>{props.orderId}</b>
        </span>
        <span>
          Status: <b>{props.status}</b>
        </span>
        <Button value="Cancel order" small="true" danger="true" />
      </div>

      {/* heading */}
      <h2>Ordered products</h2>

      {/* product cards */}
      <div className="orderCard__productsWrapper">
        <div className="orderCard__products">
          {props.products?.map((product) => (
            <ProductCard key={product._id} {...product} small="true" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
