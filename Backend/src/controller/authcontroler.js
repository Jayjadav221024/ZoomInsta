const usermodel = require("../models/usermodel");
const foodpartner = require("../models/foodpartner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const foodpartnermodel = require("../models/foodpartner");

//Register user
async function registeruser(req, res) {
  const { FullName, Email, Password } = req.body;

  const isuseralredy = await usermodel.findOne({
    Email,
  });
  if (isuseralredy) {
    return res.status(400).json({
      meassage: "user already exsists",
    });
  }
  const hashpass = await bcrypt.hash(Password, 10);

  const user = await usermodel.create({
    FullName,
    Email,
    Password: hashpass,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,);
  res.cookie("token", token);
  res.status(201).json({
    meassage: "User Sucessfull Created",
    user: {
      _id: user._id,
      FullName:user.FullName,
      Email: user.Email,
      Password: user.Password,
    },
  });
}

//Login user
async function loginuser(req, res) {
  const { Email, Password } = req.body;
  const user = await usermodel.findOne({
    Email,
  });
  if (!user) {
    res.status(404).json({
      message: "invalid email or password",
    });
  }
  const ispassword = await bcrypt.compare(Password, user.Password);
  if (!ispassword) {
    res.status(404).json({
      message: "invalid email or password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "user login sucessfully",
    user: {
      Email: user.Email,
    },
  });
}

//logout user
async function logoutuser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "user logged out",
  });
}

//Register Foodparnter
async function regiterfoodpartner(req, res) {
  const { Name, Email, Password, phone, address, Contactname } = req.body;

  const isregitserfoodparnter = await foodpartnermodel.findOne({
    Email,
  });
  if (isregitserfoodparnter) {
    return res.status(400).json({
      meassage: "Foodpartner already exsists",
    });
  }
  const hashpass = await bcrypt.hash(Password, 10);

  const user = await foodpartnermodel.create({
    Name,
    Email,
    Password: hashpass,
    phone,
    address,
    Contactname
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  res.cookie("token", token);
  res.status(201).json({
    meassage: "Foodpartner Sucessfull Created",
    user: {
      _id: user._id,
      Email: user.Email,
      Password: user.Password,
    },
  });
}


//login Foodpartner
async function loginfoodpartner(req, res) {
  const { Email, Password } = req.body;
  const user = await foodpartnermodel.findOne({
    Email,
  });
  if (!user) {
    res.status(404).json({
      message: "invalid email or password",
    });
  }
  const ispassword = await bcrypt.compare(Password, user.Password);
  if (!ispassword) {
    res.status(404).json({
      message: "invalid email or password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "Foodpartner login sucessfully",
    user: {
      Email: user.Email,
    },
  });
}

//logout Foodpartner
 function logoutfoodpartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Foodpartner logged out",
  });
}

module.exports = {
  registeruser,
  loginuser,
  logoutuser,
  regiterfoodpartner,
  loginfoodpartner,
  logoutfoodpartner
};
