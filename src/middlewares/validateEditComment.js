const { editCommentSchema } = require("../schemas/commentSchemas");

const validateEditComment = (req,res,next) => {
    try {
        const { error } = editCommentSchema.validate(req.body);
        if (error) {
        return res.status(400).json({ error: "Estructura inválida.", message: error.details[0].message });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Ocurrió un error al intentar validar el comentario."});
    }
};

module.exports = validateEditComment;
