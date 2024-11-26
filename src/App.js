import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
// Use state for cart pop-up & closure
  const [showCart, setShowCart] = useState(false);

  const showCartHandler =()=> {
    setShowCart(true);
  };
  const hideCartHandler =()=> {
    setShowCart(false);
  }

  return (
// Wrap components within the context
    <CartProvider>
      {showCart && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler}/>
      <main>
       <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
