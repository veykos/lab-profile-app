const {expressjwt:jwt} = require('express-jwt')

// Instantiate the JWT token validation middleware
// this takes care of taking the token from the header
// and verifying if its real

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms:["HS256"],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders
});

// Function to extract the token's string from the request's
// Authorization HEADER -> will be used by isAuthenticated();

function getTokenFromHeaders(req) {
  // check if token is available in the HEADER
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
    //get the token string and return it so isAuthenticated can use it
    const token = req.headers.authorization.split(' ')[1]
    return token;
  }
  return null;
}

// export so we can use everywhere
module.exports = {
  isAuthenticated
}