const Post = require("../models/post");
const mongoose = require("mongoose");

const searchPostId = async (req, res, next) => {

    try {
        // si la ruta tiene :id lo toma de la url (ej: /posts/:id/images), si no lo toma del body (ej: POST /comments)
        const postId = req.params.id || req.body.postId;

        if (!mongoose.isValidObjectId(postId)) {
            return res.status(404).json({ message: "ID de publicación inexistente." });
        }

        const post = await Post.findById(postId)
            .populate("user", "nickName")
            .populate("tags", "nombre")
            .populate({ path: "comments", populate: { path: "user", select: "nickName" } })

        if (!post) {
            return res.status(404).json({ message: "ID de publicacion inexistente." });
        }

        req.post = post;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al obtener la publicación." });
    }
};

module.exports = searchPostId;