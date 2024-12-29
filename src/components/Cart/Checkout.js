import styles from './Checkout.module.css'


const Checkout = (props)=>{

    const confirmHandler =(e)=>{
        e.preventDefault();
    };


    return (
        <form className={styles.form} onSubmit={confirmHandler}>
            <div className='styles.controll'>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" />
             </div>
             <div className='styles.controll'>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" />
             </div>
             <div className='styles.controll'>
                <label htmlFor="Postal Code">Postal Code</label>
                <input type="text" id="Postal Code" />
             </div>
             <div className='styles.controll'>
                <label htmlFor="City">City</label>
                <input type="text" id="City" />
             </div>
             <div className={styles.actions}>
             <button type='button' onClick={props.onCancel }>Cancel</button>
             <button className={styles.submit}>Confirm</button>
             </div>
        </form>
    )
}

export default Checkout;