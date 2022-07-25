const paymentRoute = require("express").Router();

const KEY =
  "sk_test_51IH1fhBfH5vgSjyQUytEYiEFPsTQev809UjHseNHAW1k7RMCGL5QVA4JfdCBvTnlfRUA1Dba0QFQuqzCyOmAChd900DmG1xH9y";
const stripe = require("stripe")(KEY);


paymentRoute.post("/payment" , (req,res) => {
    
     stripe.charges.create( {
        source : req.body.tokenId,
        amount : req.body.amount,
        currency: "usd"
    }, (error, charge) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.status(200).json(charge);
        }
    })
})

module.exports = paymentRoute;
