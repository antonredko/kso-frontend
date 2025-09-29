import React, { createContext, useReducer, useContext } from 'react';

// Початковий стан чека
const initialState = {
  items: [{ id: 1, name: 'Молоко', price: 35.50, quantity: 1, total: 35.50 }], // [{ id: 1, name: 'Молоко', price: 35.50, quantity: 1, total: 35.50 }]
  subtotal: 0,
  discount: 0,
  total: 0,
};

// Хелпер: знаходить товар за ID та перераховує чек
const calculateTotals = (items) => {
  let subtotal = 0;
  let discount = 0; 
  
  items.forEach(item => {
    subtotal += item.total;
    // Тут у майбутньому можна додати логіку знижок
  });

  const total = subtotal - discount;
  return { items, subtotal, discount, total };
};

// Редуктор (Reducer) для обробки дій
const checkReducer = (state, action) => {
  switch (action.type) {
    
    case 'ADD_ITEM': {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(i => i.id === newItem.id);
      let newItems;
      
      if (existingItemIndex > -1) {
        // Якщо товар вже є: збільшуємо кількість
        newItems = state.items.map((item, index) => {
          if (index === existingItemIndex) {
            const newQuantity = item.quantity + 1;
            return {
              ...item,
              quantity: newQuantity,
              total: item.price * newQuantity,
            };
          }
          return item;
        });
      } else {
        // Якщо товар новий: додаємо його
        const itemWithTotal = {
          ...newItem,
          quantity: 1,
          total: newItem.price,
        };
        newItems = [...state.items, itemWithTotal];
      }
      return calculateTotals(newItems);
    }
    
    case 'UPDATE_QUANTITY': {
        const { id, change } = action.payload;
        
        let newItems = state.items
            .map(item => {
                if (item.id === id) {
                    const newQuantity = item.quantity + change;
                    if (newQuantity <= 0) return null; // Буде видалено
                    
                    return {
                        ...item,
                        quantity: newQuantity,
                        total: item.price * newQuantity,
                    };
                }
                return item;
            })
            .filter(item => item !== null); // Видаляємо товари з кількістю 0
            
        return calculateTotals(newItems);
    }
    
    case 'CLEAR_CHECK':
      return initialState;

    default:
      return state;
  }
};

// Створення контексту
export const CheckContext = createContext(initialState);

// Провайдер, який обертає App
export const CheckProvider = ({ children }) => {
  const [state, dispatch] = useReducer(checkReducer, initialState);

  // Об'єкт, який передається споживачам контексту
  const checkActions = {
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    updateQuantity: (id, change) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, change } }),
    clearCheck: () => dispatch({ type: 'CLEAR_CHECK' }),
  };

  return (
    <CheckContext.Provider value={{ state, ...checkActions }}>
      {children}
    </CheckContext.Provider>
  );
};

// Хук для використання контексту в компонентах
export const useCheck = () => {
  return useContext(CheckContext);
};