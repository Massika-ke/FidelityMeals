import { useContext, useEffect, useState } from "react"


import CartIcon from "../Cart/CartIcon"
import styles from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context"


const HeaderCartButton = props =>{

//state to manage btn highlight 
    const [highlightBtn, setHighlightBtn] = useState(false);
// Access cartcontext from CartProvider
    const cartCtx = useContext(CartContext);
// Update cart items method
    const numOfCartItems = cartCtx.items.reduce((curNumber, item) =>{
        return curNumber + item.amount;
    }, 0);

    const {items} = cartCtx;
    const btnClasses = `${styles.button} ${highlightBtn ? styles.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setHighlightBtn(true);

        const timer = setTimeout(() => {
            setHighlightBtn(false);
        }, 300);

        return () =>{
            clearTimeout(timer);
        };
    }, [items]);

    return(
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>
                {numOfCartItems}
            </span>
        </button>
    )
}


export default HeaderCartButton;