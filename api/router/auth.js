

const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const user = require("../model/user");
//register authentication
authRouter.post("/register", async (req,res) => {
    try {
        const newUser = await user.create({
          ...req.body,
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
          ),
        });
        res.status(200).json(newUser);
    } catch (error) {
       res.status(401).json(error); 
    }
})

//login authentication
authRouter.post("/login" , async (req,res) => {
    try {
        const newUser = await user.findOne({ username: req.body.username });
        if (!newUser) {
          res.status(401).json("Wrong credential");
        }
        const hashedPassword = CryptoJS.AES.decrypt(newUser.password, process.env.SECRET_KEY);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json("Wrong credential!");
        //jwt token
        const accessToken = jwt.sign(
          {
            id: newUser._id,
            isAdmin: newUser.isAdmin,
          },
          "Nathan",
          {
            expiresIn: "3d",
          }
        );
        
        const { password, ...others } = newUser._doc;
        res.status(200).json({...others, accessToken});
    } catch (error) {
        res.status(500).json("No such found!");
    }
})

module.exports = authRouter;