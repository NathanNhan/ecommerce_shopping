const {
  verifyAdmin,
  verifyTokenandAuthorization,
  verifyToken,
} = require("./verifyToken");

const orderRoute = require("express").Router();
const order = require("../model/order");

//create order
orderRoute.post("/", verifyToken, async (req, res) => {
  const newOrder = await order.create(req.body);
  res.status(200).json(newOrder);
});

orderRoute.patch("/:id", verifyAdmin, async (req, res) => {
  try {
    const updatedOrder = await order.findOneAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );
    if (!updatedOrder) {
      res.status(401).json("No such found!");
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json("No such found");
  }
});

//delete order
orderRoute.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await order.findByIdAndDelete(req.params.id);
    res.status(200).json("product have been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});
//get a order cart
orderRoute.get(
  "/find/:userId",
  verifyTokenandAuthorization,
  async (req, res) => {
    try {
      const singleOrder= await order.findOne({
        userId: req.params.userId,
      });
      res.status(200).json(singleOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//get all
orderRoute.get("/", verifyAdmin, async (req, res) => {
  try {
    const allOrders = await order.find();
    res.status(200).json(allOrders);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = orderRoute;
//icome
orderRoute.get("/income", verifyAdmin, async (req,res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(lastMonth.setMonth(lastMonth.getMonth() - 1));
  try {
     const income = await order.aggregate([
      {
        $match : { createdAt : {$gte : prevMonth}, ...(productId && {
          products: {$elemMatch : {productId}}
        })}
      },
      {
        $project : {
          month : { $month : "$createdAt"},
          sales : "$amount"
        }
      }, {
        $group : {
          _id : "$month",
          total : {$sum : "$sales"}
        }
      }
     ])
     res.status(200).json(income);
  } catch (err){
    res.status(500).json(err);
  }
})