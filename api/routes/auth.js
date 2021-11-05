const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userExists = await User.findOne({username: req.body.username})
    if(userExists){
      res.status(400).json({msg: "The username is already taken."})
      throw new Error('The username is already taken.')
    }
    const userExistsEmail = await User.findOne({email: req.body.email})
    if(userExistsEmail){
      res.status(400).json({msg: "The email is already taken."})
      throw new Error('The email is already taken.')
    }
    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
      res.status(400).json({msg: "User not found"});
      throw new Error("user not found");
     } 

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword ){
      res.status(400).json({msg:"Invalid Password"})
      throw new Error("wrong password")
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;