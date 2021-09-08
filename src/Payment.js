import React, { useState } from 'react';
import {styles} from './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

export default function Payment () {

    const [{basket, user}, dispatch] = useStateValue();
    
    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const handleSubmit = e => {
        //stripe stuff
    }
    const handleChange = event => {
        //stripe stuff
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");

    }


    return (

        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to='/checkout'>{basket?.length} items</Link>
                    )
                </h1>


                <div className='payment__section'>
                    <div className='payment__title'>
                            <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>Address</p>
                        <p>Pt.2</p>
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                            <h3>Review Items and Delivery</h3>
                    </div>
                    <div className='payment__item'>
                        {basket.map(item => (
                            <CheckoutProduct 
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}                            
                            />
                        ))}
                    </div>
                </div>

                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className='payment_details'>
                            
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} /> 
                        </form>
                    </div>
                </div>

            </div>
        </div>

    );
}