const jwt = require("jsonwebtoken");
require("dotenv").config();


const verifyJWT = (req, res, nextDay) => { 
    const authHeader = req.headers["authorization"]
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader);   //bearer token
    const token = authHeader.split(" ")[1];  // split method of the String class is used to divide a string into an array of substrings.
}