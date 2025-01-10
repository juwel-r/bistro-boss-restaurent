/**
 Steps to setup stripe 
 1. install @stripe/react-stripe-js
 2. setup card element
 3 create account on stripe and get pk -publishable <keygen />
 4. use publishable key and use stripe to get submitted card information (check error or valid)
 5. install "stripe" create a "post" api on server and get client secret and send clientSecret to client side
 6. use payment method card which declared before form "const card = elements.getElement(CardElement);".
 7."confirmCardPayment" like >>======>
     const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card, // card from 33 number line
          billing_details: {
            name: userInfo?.disPlayName || "Anonymous",
            email: userInfo?.email || "No Email",
          },
        },
      });
<<=====================<<
8.then display any data for user as need by using useState
 */




import React from 'react';
import SectionHeader from '../../../components/SectionHeader';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const Payment = () => {
    return (
        <div>
            <SectionHeader heading="Payment" subHeading={"Please make a payment"}></SectionHeader>
            <Elements stripe={stripePromise}>
                <CheckOutForm></CheckOutForm>
            </Elements>
        </div>
    );
};

export default Payment;


/**
 1. install strip js react
 2.add strip promise with loadStripe
 3. add pk- publishable key
 */