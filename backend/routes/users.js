const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")


//EXAMPLE CONCEPT
router.get("/test", (req, res) => {
  res.status(200).json("respon to routes")
})
//EXAMPLE CONCEPT



//REGISTER
router.post("/register", async (req, res) => {

  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,

    });
    //try save
    const user = await newUser.save()
    //send response
    res.status(200).json(user._id)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }



})
//REGISTER

//LOGIN
router.post('/login', async (req, res) => {
  try {
    //find user
    const user = await User.findOne({
      username: req.body.username,
    })
    !user && res.status(400).json("Wrong username or password")

    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    )

    !validPassword && res.status(400).json("Wrong username or password")
    // const { _id } = user
    //send response
    res.status(200).json({ _id: user._id, username: user.username })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})






//LOGIN
module.exports = router;