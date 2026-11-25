const mongoose = require("mongoose");
const postImageSchema = require("./post_images");
const transform = require("./toJSON")
const fechaLimiteComentarios = require("./fechaLimiteComentarios")

const postSchema = new mongoose.Schema({
  descripcion: { type: String, required: true, trim: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fecha: { type: Date, default: Date.now  },
  images: [postImageSchema],
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
});

// comentarios del post
postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  match: () => ({ fecha: { $gte: fechaLimiteComentarios() } }),
  options: { sort: { fecha: -1 } }
});

// cantidad de comentarios visibles (sin traerlos)
postSchema.virtual("commentsCount", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  match: () => ({ fecha: { $gte: fechaLimiteComentarios() } }),
  count: true,
});

postSchema.set("toJSON", { virtuals: true, transform })
postSchema.set("toObject", { virtuals: true, transform })

module.exports = mongoose.model("Post", postSchema);
