const mongoose = require("mongoose");
const transform = require("./toJSON")

const tagSchema = new mongoose.Schema({
    nombre: {type: String, required: true, trim: true, unique: true},
});

tagSchema.set("toJSON", { virtuals: true, transform })
tagSchema.set("toObject", { virtuals: true, transform })

module.exports = mongoose.model("Tag", tagSchema);