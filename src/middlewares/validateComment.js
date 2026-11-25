const { commentSchema } = require("../schemas/commentSchemas");

const validateComment = (req,res,next) => {
    try {
        const { error } = commentSchema.validate(req.body);
        if (error) {
        return res.status(400).json({ error: "Estructura inválida.", message: error.details[0].message });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Ocurrió un error al intentar validar el comentario."});
    }
};

module.exports = validateComment;
