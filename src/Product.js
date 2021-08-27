import './Product.css';
import StarIcon from '@material-ui/icons/Star';

const Product = ({ title, image, price, rating }) => {
  return (
    <div className='product'>
      <div className='product__info'>
        <p>{title}</p>
        <p className='product__price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='product__rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon style={{ fill: '#eba834' }} />
            ))}
        </div>
      </div>
      <img src={image} alt='' />

      <button>Add to Cart</button>
    </div>
  );
};

export default Product;
