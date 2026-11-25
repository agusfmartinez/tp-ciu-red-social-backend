const mongoose = require("mongoose");
const Comment  = require("../models/comment");

const searchCommentId = async (req,res,next) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)){
            return res.status(400).json({message:"El ID de comentario tiene un formato inválido."});
        }
        const comment = await Comment.findById(id).populate("user", "nickName");
        
          if (!comment) {
            return res.status(404).json({ message: "ID de comentario inexistente." });
        }

        req.comment = comment;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Ocurrió un error al obtener el comentario."});
    }
};

module.exports = searchCommentId;
