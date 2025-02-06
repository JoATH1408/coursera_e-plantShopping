import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // ✅ 총 결제 금액 계산 함수
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.quantity * parseFloat(item.cost.replace('$', '')), 0).toFixed(2);
  };

  // ✅ 개별 아이템 총 가격 계산 함수
  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.replace('$', ''))).toFixed(2);
  };

  // ✅ 수량 증가 함수 (Redux 상태 업데이트)
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // ✅ 수량 감소 함수 (0이면 삭제)
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // ✅ 아이템 삭제 함수
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // ✅ "Continue Shopping" 버튼 기능
  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  // ✅ "Checkout" 버튼 (실제 기능 X, 알림만 표시)
  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
