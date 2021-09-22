import ProductCard from '../ProductCard';
import './productCardGen.scss';

function ProductCardGen(props) {
  return (
    <div className="multipleProducts">
      {props.products?.map((product) => {
        let breakUrl = product.imageUrl[0].split('upload');
        breakUrl = breakUrl[0] + 'upload/ar_3:2,c_fill' + breakUrl[1];

        return (
          <ProductCard
            key={product._id}
            {...product}
            imageUrl={breakUrl}
            wishlists="true"
          />
        );
      })}
    </div>
  );
}

export default ProductCardGen;
