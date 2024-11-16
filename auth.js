const jwt = require("jsonwebtoken");

//function for authorization of user based on role(admin/user) and JWT Token
const auth = (role) => (req, res, next) => {
  //authorisation header is taken from request
  const { authorization } = req.headers;

  //Splitting bearer and Token part from value (Bearer {token}) split(" ") returns a list which will contain token on the [1] index
  const token = authorization.split(" ")[1];

  //if token undefined then returns unauthorised
  if (token === undefined) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  //verifying the token and fetching the payload
  jwt.verify(token, "abcdefg", (err, payload) => {
    if (err) {
      res.status(400).send("Invalid JWT Token");
    } else {
      //matching the role provided in the function with the role in payload,if matched payload with be send as request,otherwise it will be return Error
      if (payload.role !== role) {
        return res.status(403).send({ error: "Forbidden" });
      }

      req.user = payload;
      next();
    }
  });
};

module.exports = auth;
