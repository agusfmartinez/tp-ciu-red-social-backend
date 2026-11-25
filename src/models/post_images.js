const mongoose = require("mongoose");
const transform = require("./toJSON")

// incrustado en PostSchema
const postImageSchema  = new mongoose.Schema({
    url: { type: String, required: true, trim: true },
});

postImageSchema.set("toJSON", { virtuals: true, transform })
postImageSchema.set("toObject", { virtuals: true, transform })

module.exports = postImageSchema;