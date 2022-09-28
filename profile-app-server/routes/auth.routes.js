const router = require('express').Router();
const User = require('../models/User.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.post("/signup", (req,res,next) => {
  const { username, password, campus, course} = req.body;
  //check username if it exists or not
  User.findOne({username})
  .then(foundUser => {
    // if user is found send an error response
    if (foundUser) {
      res.status(400).json({message:'Username already registered.'})
      return
    }
    // if user is unique continue with hashing pass
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(password,salt)

    //create the new user in db
    return User.create({username, password:hashedPassword, campus, course})
  })
  .then(newUser => {
    //deconstruct the new user created to remove the password even if its hashed
    const {username, campus, course} = newUser;
    //create a new object without the password;

    const user = {username, campus, course}
    // send a response containing the user
    res.status(201).json({user:user})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({message: "Internal server error"})
  })
})

router.post("/login" , (req,res,next) => {
  const {username, password} = req.body;

  //check if username exists
  User.findOne({username})
  .then(foundUser => {
    if (!foundUser) {
      //if user is not found respond with error
      res.status(401).json({message:'No such username found'})
      return
    }
    const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
    if (passwordCorrect) {
      // deconstruct again the user object to remove the password :)
      const {username, campus, course} = foundUser;
      //create a PAYLOAD to prepare for creating a TOKEN :)
      const payload = {username,campus,course}

      //Create the token with JWT.sign function
      const authToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET,
        {algorithm :'HS256', expiresIn: '6h'}
      );

      // Send the token back to the user where he'll save it on the front end part
      res.status(200).json({ authToken: authToken})
    }
    else {
      res.status(401).json({message: 'Password incorrect'})
    }
  })
  .catch(err => {
    res.status(500).json({message: 'Internal server error'})
  });
});

// this next route is used to verify the token that the user will send on any request

router.get('/verify', isAuthenticated, (req,res,next) => {
  // if the JWT token is valid the payload gets decoded by the middleware
  // and made available on req.payload
  res.status(200).json(req.payload)
})



module.exports = router;