const { verifyTokenandAuthorization, verifyAdmin } = require("./verifyToken");

const userRouter = require("express").Router();
const CryptoJS = require("crypto-js");
const user = require("../model/user");

userRouter.patch('/:id' , verifyTokenandAuthorization , async (req,res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.SECRET_KEY
        ).toString();
    }
    try {
        const updatedUser = await user.findOneAndUpdate({_id: req.params.id}, {
            ...req.body
        })
        if(!updatedUser){
            res.status(401).json("No such found!")
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json("No such found")
    }
})

//delete user
userRouter.delete('/:id' , verifyTokenandAuthorization , async (req,res) => {
    try {
        await user.findByIdAndDelete(req.params.id);
        res.status(200).json("user have been deleted")
    } catch (error) {
        res.status(500).json(error);
    }
})
//get a user
userRouter.get('/find/:id', verifyAdmin , async (req,res) => {
    try {
        const singleUser = await user.findById(req.params.id);
        res.status(200).json(singleUser);
    } catch (error) {
        res.status(500).json(error)
    }
})

//get all users
userRouter.get("/", verifyAdmin, async (req, res) => {
    const query = req.query.new;
  try {
    const users = query ? await user.find().sort({_id: -1}).limit(5) : await user.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get stats user
userRouter.get("/stat" , verifyAdmin , async (req,res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        const data = await user.aggregate([
           {
            $match : {
                createdAt: { $gte : lastYear}
            }
           },
           {
            $project : {
                month : {$month : "$createdAt"},
            }
           },
           {
            $group : {
                _id : "$month",
                total: {$sum : 1}
            }
           }
        ])
        res.status(200).json(data);
    } catch (error) {
        
    }
})

module.exports = userRouter;