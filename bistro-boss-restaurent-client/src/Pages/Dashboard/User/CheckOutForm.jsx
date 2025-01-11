import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import useCart from "../../../Hooks/useCart";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckOutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [transaction, setTransaction] = useState("");
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useAuth();
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((a, c) => a + c.productPrice, 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);
  // console.log(clientSecret);

  const handleSubmit = async (e) => {
    setTransaction("");
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card === null) return;
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    //
    if (error) {
      console.log("payment error is ", error);
      setError(error.message);
    } else {
      console.log("Payment method info is", paymentMethod);
      setError("");
    }

    //confirm payment
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
    if (confirmError) {
      console.log("payment confirm error", confirmError);
    } else {
      console.log("paymentIntent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransaction(paymentIntent.id);
        const paymentInfo = {
          email: userInfo.email,
          amount: totalPrice,
          transactionId: paymentIntent.id,
          cartIds: cart.map((item) => item._id),
          productIds: cart.map((item) => item.productId),
          date: new Date(),
          status: "pending",
        };
        axiosSecure.post("/payment", paymentInfo).then((res) => {
          // console.log(res.data);
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Payment successful $${totalPrice}`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/payment-history");
        });
      }
    }
  };

  return (
    <>
      <p className="text-xl ml-7">Total Items:{cart.length}</p>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <CardElement
          className="border grow p-4 mx-4 bg-white"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!stripe || !clientSecret || totalPrice < 1}
        >
          Pay
        </button>
      </form>
      {transaction && (
        <p className="text-green-600">
          Your Payment successful, Transaction Id is{" "}
          <strong>{transaction}</strong>
        </p>
      )}
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
};

export default CheckOutForm;
