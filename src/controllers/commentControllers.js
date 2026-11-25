const Comment = require("../models/comment");

const getComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .select("comentario fecha post")
            .populate("user", "nickName");
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al obtener los comentarios." });
    }
};

const getComment = async (req, res) => {
    try {
        res.status(200).json(req.comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al obtener el comentario." });
    }
};

const createComment = async (req, res) => {
    try {
        const { comentario, postId, userId } = req.body;

        const comment = await Comment.create({
            comentario,
            post: postId,
            user: userId,
        });

        res.status(201).json({
            message: "Comentario creado con éxito.",
            comentario: {
                id: comment.id,
                textoComentario: comment.comentario,
                fechaDeCreacion: comment.fecha,
                postId: comment.post,
                userId: comment.user,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al crear el comentario." });
    }

};

const editComment = async (req, res) => {
    try {
        const comment = req.comment;
        const { comentario } = req.body;

        comment.comentario = comentario;
        await comment.save()
      
        res.status(200).json({
            message: "Comentario actualizado con éxito.",
            comentario: {
                id: comment.id,
                textoComentario: comment.comentario,
                fechaDeActualizacion: comment.updatedAt,
                postId: comment.post,
                userId: comment.user._id || comment.user,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al actualizar el comentario." });
    }

};

const deleteComment = async (req, res) => {
    try {
        const comment = req.comment;
        await comment.deleteOne();
        res.status(200).json({ message: `El comentario con ID ${comment.id} fue eliminado con éxito.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al eliminar el comentario." });
    }
};
module.exports = {
    getComments,
    getComment,
    createComment,
    deleteComment,
    editComment
};
