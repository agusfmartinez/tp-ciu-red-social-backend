'use strict';

const mongoose = require("mongoose");
const transform = require("./toJSON")
const fechaLimiteComentarios = require("./fechaLimiteComentarios")

const commentSchema = new mongoose.Schema({
    "comentario": {type: String, required: true, trim: true},
    "post": {type: mongoose.Schema.Types.ObjectId, ref:"Post", required: true},
    "user": {type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
    "fecha": {type: Date, default: Date.now, required: true},
});

commentSchema.virtual("visible").get(function () {
  return this.fecha >= fechaLimiteComentarios();
});

commentSchema.set("toJSON", { virtuals: true, transform })
commentSchema.set("toObject", { virtuals: true, transform })

module.exports = mongoose.model("Comment", commentSchema);