import ProductCard from '../ProductCard';
import './productCardGen.scss';

function ProductCardGen(props) {
  return (
    <div className="multipleProducts">
      {props.products?.map((product) => {
        return <ProductCard key={product._id} {...product} wishlists="true" />;
      })}
    </div>
  );
}

export default ProductCardGen;
