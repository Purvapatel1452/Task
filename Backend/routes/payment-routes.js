const express = require("express");
const {
  paymentIntent,
  stripeIntent,
  stripWebhook,
  upiWebhook,
} = require("../controllers/payment-controller");

const stripe = require("stripe")(
  "sk_test_51P6pcYSCdNlkqtTKEbkko3R7u9AU05pNEw9TKpeAtiEze3NmZlsWaun94sEQehiPPdlUouvIJ5d2thhp2527uaaJ00WSnKy45N"
);

const paymentRouter = express.Router();

paymentRouter.use(express.json());

paymentRouter.post("/create-payment-intent", paymentIntent);

paymentRouter.post("/intents", stripeIntent);

paymentRouter.post("/stripe/webhook", stripWebhook);

paymentRouter.post("/upi-webhook", upiWebhook);

module.exports = paymentRouter;
