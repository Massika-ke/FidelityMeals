import React from 'react'
import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action)=>{
  if (action.type === 'ADD'){
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

    // check if item exists in the items
    const existingCartItemIndex = state.items.findIndex(
      (item => item.id === action.item.id)
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    // If item already exists in the item, update
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    // Add/update item amount as new entry 
    else {
      updatedItems = state.items.concat(action.item);
    }

    return{
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  //Removing Items
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    // Remove Item from cart if < 1
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } 
    // Decrease the Item if > 1
    else {
      const updatedItem = {...existingItem, amount: existingItem.amount -1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  };
  // Clear Cart items after submit
  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  return defaultCartState;
}

// Context provider method + initialised object values
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer, 
    defaultCartState
  );
  // Add to cart handler function
    const addToCart =(item)=>{
      dispatchCartAction({type: 'ADD', item: item});
    };
  // Remove from cart handler method
    const removeFromCart =(id)=>{
      dispatchCartAction({type: 'REMOVE', id: id});
    };
    // clear cart items
    const clearCartFunc =()=>{
      dispatchCartAction({type: 'CLEAR'});
    }

    const cartContext= {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addToCart,
        removeItem: removeFromCart,
        clearCart: clearCartFunc
    }

  return (
  // Wrap all components reguiring the context from App.js
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;
