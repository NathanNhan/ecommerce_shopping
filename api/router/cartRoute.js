const { verifyAdmin, verifyTokenandAuthorization, verifyToken } = require("./verifyToken");

const cartRouter = require("express").Router();
const cart = require("../model/cart");

//create cart
cartRouter.post("/", verifyToken, async (req, res) => {
  const newCart = await cart.create(req.body);
  res.status(200).json(newCart);
});

cartRouter.patch("/:id", verifyTokenandAuthorization, async (req, res) => {
  try {
    const updatedCart = await cart.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );
    if (!updatedCart) {
      res.status(401).json("No such found!");
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json("No such found");
  }
});

//delete cart
cartRouter.delete("/:id", verifyTokenandAuthorization, async (req, res) => {
  try {
    const cartproduct = await cart.findByIdAndDelete(req.params.id);
    res.status(200).json(cartproduct);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get a user cart
cartRouter.get(
  "/find/:userId",
  verifyTokenandAuthorization,
  async (req, res) => {
    try {
      const singleCart = await cart.findOne({
        userId : req.params.userId
      });
      res.status(200).json(singleCart);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//get all 
cartRouter.get("/" , verifyAdmin, async (req,res) => {
   try {
      const allCarts = await cart.find();
      res.status(200).json(allCarts);
   } catch (error) {
      res.status(500).json(error);
   }
})


module.exports = cartRouter;
