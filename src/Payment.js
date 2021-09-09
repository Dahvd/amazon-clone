import React, { useEffect, useState } from 'react';
import {styles} from './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';

export default function Payment () {

    const [{basket, user}, dispatch] = useStateValue();
    const history = useHistory();
    
    const stripe = useStripe();
    const elements = useElements();
    
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        //generate stripe secret which lets you charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                //stripe needs payments in cents so *100
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [basket])

    const handleSubmit = async (event) => {
        //stripe stuff
        event.preventDefault(); //Stops refreshing
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentItent is payment confirmation

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replace('/orders');
        })
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
                            <div className='payment_priceCotainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                <>
                                    <h3>Order Total: {value}</h3>
                                </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>
                                    {processing ? <p>Processing</p> : 'Buy Now'}
                                </span>
                            </button>
                            </div>

                            {/* We have Error state so if error show this div */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>

            </div>
        </div>

    );
}