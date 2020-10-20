import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/checkout/Checkout";
import Login from "./components/login/Login";
import { auth } from "./firebase";
import { useStateValue } from "./context/StateProvider";
import { SET_USER } from "./context/actions";
import Payment from "./components/payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./components/orders/Orders";
import { LOAD_STRIPE } from "../config";

const promise = loadStripe(LOAD_STRIPE);

const App = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: SET_USER,
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        {!user ? (
          <Login />
        ) : (
          <Switch>
            <Route path="/orders">
              <Header />
              <Orders />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            <Route path="/payment">
              <Header />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        )}
      </div>
    </Router>
  );
};

export default App;
