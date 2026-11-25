const mongoose = require("mongoose");
const transform = require("./toJSON")

const userSchema = new mongoose.Schema({
  "nickName": {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
});

userSchema.set("toJSON", { virtuals: true, transform })
userSchema.set("toObject", { virtuals: true, transform })

module.exports = mongoose.model("User", userSchema);