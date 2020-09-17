import React, { useState, useEffect } from "react";
import { useStateValue } from "../../context/StateProvider";
import CheckoutProduct from "../checkout/CheckoutProduct";
import "./Payment.css";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../context/reducer";
import axios from "./axios";
import { EMPTY_BASKET } from "../../context/actions";
import { db } from "../../firebase";

const Payment = () => {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate the sppecial stripe secret which allows us to charge a costumer
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //stripe spects the total in currencies subunits
        url: `/payments/create?total=${(
          getBasketTotal(basket) * 100
        ).toFixed()}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
    return () => {
      getClientSecret();
    };
  }, [basket]);

  console.log("The secret is >>>> ", clientSecret);

  const handleSubmit = async (event) => {
    //stripe stuff
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //payment intend = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: EMPTY_BASKET,
        });

        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    //listen for changes in card ellement
    //and dispaly any errors as the costumer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* payment section delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        {/* payment section review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket &&
              basket.map((item, i) => (
                <CheckoutProduct
                  key={item.id + i}
                  image={item.image}
                  title={item.title}
                  id={item.id}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
          </div>
        </div>
        {/* payment  section payment  method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* stripe magic */}
            <form onSubmit={handleSubmit}>
              <CardElement
                onChange={handleChange}
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
              />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
