const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./router/auth");
const cartRouter = require("./router/cartRoute");
const orderRoute = require("./router/orderRoute");
const productsRouter = require("./router/productRoute");
const userRouter = require("./router/userRoute");
const dotenv = require("dotenv").config();
const cors = require("cors");
const paymentRoute = require("./router/paymentRoute");
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(5200, () => {
      console.log("App running!");
    });
  })
  .catch((err) => console.log(error));
app.use(cors());
app.use("/api/user", authRouter);

app.use("/api/user" , userRouter);

app.use("/api/products" , productsRouter);

app.use("/api/cart" , cartRouter);

app.use("/api/order" , orderRoute);

app.use("/api/checkout" , paymentRoute);



