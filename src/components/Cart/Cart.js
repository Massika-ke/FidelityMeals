import React, { useContext, useState } from 'react';

import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) =>{

    const cartCtx = useContext(CartContext);
    const [isCheckout, setCheckout] = useState(false);
    const [submitting, setSubmit] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemove = (id) =>{
        cartCtx.removeItem(id);
    };
    const cartItemAdd = (item) =>{
        cartCtx.addItem(item);
    };

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map((item =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemove.bind(null, item.id)}
                    onAdd={cartItemAdd.bind(null, item)}
                 />
            ))}
        </ul>
    );

    const orderHandler =()=>{
        setCheckout(true)
    }
    // send cart data & user data to firebase
    const submitOrder = async (userData) =>{
        setSubmit(true);
        await fetch('https://react-http-d7aa5-default-rtdb.firebaseio.com/orders.json', {
          method: 'POST',
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items
          })  
        });
        setSubmit(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }

    const modalActions = 
         <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.onClose}>
                Close
            </button>
            { hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
        </div> 

    const cartModalContent = (
    <React.Fragment>
        {cartItems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={submitOrder} onCancel={props.onClose}/>}
        {!isCheckout && modalActions}
    </React.Fragment>
    );

    const isSubmittingModal = <p>Sending Order...</p>
    const didSubmitModal = 
    <>
        <p>Submitted successively...</p>
        <div className={styles.actions}>
            <button className={styles.button} onClick={props.onClose}>
                Close
            </button>
        </div> 

    </>

    return(
        <Modal onClose={props.onClose}>
            {!submitting && !didSubmit && cartModalContent}
            {submitting && isSubmittingModal}
            {didSubmit && didSubmitModal}
        </Modal>
    );
};

export default Cart;