import { useRef, useState } from 'react';
import styles from './Checkout.module.css'

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props)=>{
    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

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

        const enteredNameValid =  !isEmpty(enteredName);
        const enteredStreetValid =  !isEmpty(enteredStreet);
        const enteredCityValid =  !isEmpty(enteredCity);
        const enteredPostalValid =  isFiveChars(enteredPostal);

        setFormInputValidity({
            name: enteredNameValid,
            street: enteredStreetValid,
            city: enteredCityValid,
            postalCode: enteredPostalValid
        });

        const formIsValid = enteredNameValid && enteredStreetValid && enteredCityValid && enteredPostalValid;

        if (!formIsValid) {
            return;
        }
        // submit form data 
        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostal,
        });
    };
 

    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className={`${styles.control} ${formInputValidity.name? '': styles.invalid}`}>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" ref={nameInputRef}/>
                {!formInputValidity.name && <p>Please Enter a valid name</p>}
             </div>
             <div className={`${styles.control} ${formInputValidity.street? '': styles.invalid}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef}/>
                {!formInputValidity.street && <p>Please Enter a valid Street</p>}

             </div>
             <div className={`${styles.control} ${formInputValidity.postalCode? '': styles.invalid}`}>
                <label htmlFor="Postal Code">Postal Code</label>
                <input type="text" id="Postal Code" ref={postalInputRef}/>
                {!formInputValidity.postalCode && <p>Postal Code should be atleast 5 chars</p>}

             </div>
             <div className={`${styles.control} ${formInputValidity.city? '': styles.invalid}`}>
                <label htmlFor="City">City</label>
                <input type="text" id="City" ref={cityInputRef}/>
                {!formInputValidity.city && <p>Please Enter a valid City</p>}

             </div>
             <div className={styles.actions}>
             <button type='button' onClick={props.onCancel }>Cancel</button>
             <button className={styles.submit}>Confirm</button>
             </div>
        </form>
    )
}

export default Checkout;