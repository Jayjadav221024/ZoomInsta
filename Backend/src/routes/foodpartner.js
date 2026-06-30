const express = require("express");
const router = express.Router();
const foodpartnercontroller = require("../controller/foodpartner.controler");
const authmiddleware = require("../middleware/auth.middleware");

router.get("/me", authmiddleware.authmiddleware, (req, res) => {
  res.status(200).json({
    message: "Food partner verified",
    foodpartner: req.foodpartner,
  });
});

router.get("/:id", foodpartnercontroller.getFoodPartnerById);

module.exports = router;