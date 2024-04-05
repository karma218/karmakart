import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from './ProductCard';
import { removeFromCart, updateQuantity } from '../redux/actions/action'; // Assuming you have defined action creators for these actions

const Cart = () => {
  const cartItems = useSelector((state) => state.cartReducer.carts);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity(productId, newQuantity));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <div className="row">
        {cartItems.map((item) => (
          <div key={item.id} className="col-md-6 mb-4">
            <ProductCard
              product={item}
              onUpdateQuantity={handleUpdateQuantity}
              onDelete={handleRemoveFromCart}
              smallSize={true} // Pass smallSize prop to ProductCard
            />
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-md-12">
          <p>Total items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
          <p>Total price: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
