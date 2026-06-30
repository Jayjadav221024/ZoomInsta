const foodmodel = require("../models/foodmodel");
const storageservice = require("../service/storage.service");
const { v4: uuid } = require("uuid");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/savemodel");

// Create Food
async function createfood(req, res) {
  try {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);
    console.log("FOODPARTNER:", req.foodpartner);

    if (!req.file) {
      return res.status(400).json({
        message: "Video file is required",
      });
    }

    const fileUploadResult = await storageservice.uploadFile(
      req.file.buffer,
      uuid()
    );

    const fooditem = await foodmodel.create({
      Name: req.body.Name || req.body.name,
      description: req.body.description,
      Video: fileUploadResult.url,
      foodpartner: req.foodpartner._id,
    });

    res.status(201).json({
      success: true,
      message: "Food item created successfully",
      food: fooditem,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Get All Food Items
async function getfooditem(req, res) {
  try {
    const fooditems = await foodmodel.find().populate(
      "foodpartner",
      "Name Email"
    );

    res.status(200).json({
      success: true,
      message: "Food items fetched successfully",
      food: fooditems,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodmodel.findByIdAndUpdate(foodId, {
            $inc: { likecount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodmodel.findByIdAndUpdate(foodId, {
        $inc: { likecount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}


async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId) {
      return res.status(400).json({
        message: "Food ID is required",
      });
    }

    const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId,
    });

    // Unsave
    if (isAlreadySaved) {
      await saveModel.deleteOne({
        user: user._id,
        food: foodId,
      });

      const updatedFood = await foodmodel.findByIdAndUpdate(
        foodId,
        {
          $inc: { savesCount: -1 },
        },
        {
           returnDocument: "after",
        }
      );

      return res.status(200).json({
        message: "Food unsaved successfully",
        save: false,
        savesCount: updatedFood.savesCount,
      });
    }

    // Save
    await saveModel.create({
      user: user._id,
      food: foodId,
    });

    const updatedFood = await foodmodel.findByIdAndUpdate(
      foodId,
      {
        $inc: { savesCount: 1 },
      },
      {
         returnDocument: "after" ,
      }
    );

    return res.status(201).json({
      message: "Food saved successfully",
      save: true,
      savesCount: updatedFood.savesCount,
    });
  } catch (error) {
    console.log("SAVE ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
}

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}

module.exports = {
  createfood,
  getfooditem,
  likeFood,
  saveFood,
  getSaveFood
};