const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    FullName: {
      type: String,
      require: true,
    },
    Email: {
      type: String,
      require: true,
      unique: true,
    },
    Password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const usermodel = mongoose.model('user',userSchema)

module.exports = usermodel;
