const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HR1rTCI3K9W8ngJ0TrqnZL8dBcD7ZK6JmgSoSM0X9w8xtGCX38rWNLPcPN2Ruz6Q0TTkPbpQLFLP8Cw1qtEWkQ000I6GHWTrp"
);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  let total = request.query.total;
  if (total === 0) {
    total = 1;
  }

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api
// example endpoint
//http://localhost:5001/clone-513f7/us-central1/api
