const validateCommentOwner = (req,res,next) => {
    try {
        const userId = req.body && req.body.userId;

        if (!userId) {
            return res.status(400).json({ error: "Estructura inválida.", message: "El campo userId es obligatorio." });
        }
        const autorId = req.comment.user._id
            ? req.comment.user._id.toString()
            : req.comment.user.toString();

        if (autorId !== userId) {
            return res.status(403).json({ message: "El usuario no es el autor del comentario." });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al validar el autor del comentario." });
    }
};

module.exports = validateCommentOwner;
