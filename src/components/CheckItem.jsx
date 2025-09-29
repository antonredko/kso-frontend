import React from 'react';
import { useCheck } from '../context/CheckContext';

const CheckItem = ({ item }) => {
  const { updateQuantity } = useCheck();

  // Форматування ціни
  const formatPrice = (price) => price.toFixed(2).replace('.', ',');

  return (
    <div className="check-item-row">
      {/* Назва товару */}
      <div className="item-name">{item.name}</div>
      
      {/* Кнопки зміни кількості */}
      <div className="item-controls">
        <button 
          className="quantity-btn minus" 
          onClick={() => updateQuantity(item.id, -1)}
        >
          -
        </button>
        <span className="item-quantity">{item.quantity}</span>
        <button 
          className="quantity-btn plus" 
          onClick={() => updateQuantity(item.id, 1)}
        >
          +
        </button>
      </div>
      
      {/* Підсумок по цьому товару */}
      <div className="item-price">
        {formatPrice(item.total)} ₴
      </div>
    </div>
  );
};

export default CheckItem;