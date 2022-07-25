const { verifyAdmin, verifyTokenandAuthorization, verifyToken } = require("./verifyToken");

const productsRouter = require("express").Router();


const products = require("../model/products");
//create products
productsRouter.post("/" , verifyAdmin , async (req,res) => {
    const newProduct = await products.create(req.body);
    res.status(200).json(newProduct);
})

productsRouter.patch('/:id' , verifyAdmin , async (req,res) => {
    try {
        const updatedProducts = await products.findOneAndUpdate({_id: req.params.id}, {
            ...req.body
        })
        if(!updatedProducts){
            res.status(401).json("No such found!")
        }
        res.status(200).json(updatedProducts);
    } catch (error) {
        res.status(500).json("No such found")
    }
})


//delete product
productsRouter.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await products.findByIdAndDelete(req.params.id);
    res.status(200).json("product have been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});
//get a product
productsRouter.get('/find/:id' , async (req,res) => {
    try {
        const product = await products.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all products
productsRouter.get("/", async (req, res) => {
    const query = req.query.new;
    const catName = req.query.cat
  try {
    let allProducts;
    if(query) {
      allProducts = await products.find().sort({createdAt: -1}).limit(5);
    }
    else if (catName) {
        allProducts = await products.find({categories : {$in : [catName]}})
    } else {
       allProducts = await products.find();    

    }
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//create review
productsRouter.post('/:id/reviews' , async(req,res) => {
  const id = req.params.id
  try {
    
    const product = await products.findById(id);
    const review = {
      username: req.body.username,
      comment: req.body.comment,
      rating: Number(req.body.rating),
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
      const updatedProduct = await product.save();
    res.status(200).json({
      message: "Review Created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
})

//get all review
productsRouter.get("/:id/reviews", async (req,res) => {
   try {
    const product = await products.findById(req.params.id);
    const allProducts = product.reviews;
    res.status(200).json(allProducts);
   } catch (error) {
    res.status(500).json(error.message);
   }
})
//delete review
productsRouter.put("/:id/reviews" ,verifyTokenandAuthorization, async (req,res) => {
  try {
    const product = await products.findById(req.body.productId);
    await product.updateOne({$pull : {reviews : {_id : req.params.id}}});
    res.status(200).json("review have been deleted");
  } catch (error) {
     res.status(500).json(error.message)
  }
})
module.exports = productsRouter;