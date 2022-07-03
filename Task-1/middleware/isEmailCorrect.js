const express = require("express");
const router = express();
const JWT = require("jsonwebtoken");
//For checking whether the email is valid
exports.isEmailCorrect = (req, res, next) => {
  if (
    req.body.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    next();
  }
  return res.end();
};
//For token validation 
exports.isTokenValid = (req, res, next) => {
  try {
    if (!req.headers.token) {
      console.error("The token does not match");
      return res.status(403).send("Invalid Token. Please recheck!");
    }

    const decodedToken = JWT.verify(req.headers.token, "Celebal Technologies");
    let studentID = decodedToken.studentID;
    if (decodedToken.adminID) {
      res.locals.studentID = studentID;
      return next();
    }
    console.warn("Token not found");
    return res.status(417).send("Please use a valid token");
  } catch (error) {
    console.error("Token validation failed");
    return res.status(401).send("Token Invalid");
  }
};

exports.isTokenValidStudent = (req, res, next) => {
  try {
    if (!req.headers.token) {
      console.error("No token was sent");
      return res.status(403).send("Token Invalid");
    }

    const decodedToken = JWT.verify(req.headers.token, "Celebal Technologies");

    if (decodedToken.studentID) {
      return next();
    }
    console.warn("Token not found");
    return res.status(417).send("Please use a valid token");
  } catch (error) {
    console.error("Token Invalid");
    return res.status(401).send("Token Invalid");
  }
};
