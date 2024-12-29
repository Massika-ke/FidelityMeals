import { useRef } from 'react';
import styles from './Checkout.module.css'


const Checkout = (props)=>{

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

    const confirmHandler =(e)=>{
        e.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;
    };
 

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={styles.control}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef}/>
             </div>
             <div className={styles.control}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef}/>
             </div>
             <div className={styles.control}>
                <label htmlFor="Postal Code">Postal Code</label>
                <input type="text" id="Postal Code" ref={postalInputRef}/>
             </div>
             <div className={styles.control}>
                <label htmlFor="City">City</label>
                <input type="text" id="City" ref={cityInputRef}/>
             </div>
             <div className={styles.actions}>
             <button type='button' onClick={props.onCancel }>Cancel</button>
             <button className={styles.submit}>Confirm</button>
             </div>
        </form>
    )
}

export default Checkout;