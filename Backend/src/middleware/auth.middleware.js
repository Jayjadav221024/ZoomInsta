const foodpartnermodel = require('../models/foodpartner')
const jwt  = require('jsonwebtoken')
const usermodel = require('../models/usermodel')

async function authmiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "login first",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const foodpartner = await foodpartnermodel.findById(decode.id);

    if (!foodpartner) {
      return res.status(403).json({
        message: "Only food partner can create food",
      });
    }

    req.foodpartner = foodpartner;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "login first",
    });
  }
}

async function authusermiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "login first",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await usermodel.findById(decode.id);

    if (!user) {
      return res.status(403).json({
        message: "Only user can access this route",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "login first",
    });
  }
}

module.exports = {
    authmiddleware,
    authusermiddleware,
}