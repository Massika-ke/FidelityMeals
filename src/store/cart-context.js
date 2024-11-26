import React from "react";

// Create context to update the Cart
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) =>{}
});


export default CartContext;