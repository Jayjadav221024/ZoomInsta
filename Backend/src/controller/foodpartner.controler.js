const foodpartnermodel = require("../models/foodpartner");
const fooditem = require("../models/foodmodel");

async function getFoodPartnerById(req, res) {
   const foodPartnerId = req.params.id;

   const foodPartner = await foodpartnermodel.findById(foodPartnerId);
   const foodItemsbyfoodpartner = await fooditem.find({ foodpartner: foodPartnerId });
   if (!foodPartner) {
       return res.status(404).json({ message: "Food partner not found" });
   }

   res.status(200).json({
    message: "Food partner fetched successfully",
    foodPartner: foodPartner,
    foodItems: foodItemsbyfoodpartner,
   });
}

module.exports = {
    getFoodPartnerById,
};