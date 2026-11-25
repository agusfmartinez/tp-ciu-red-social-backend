const { editPostSchema } = require("../schemas/postSchemas");

const validateEditPost = (req,res,next) => {
    try {
        const { error } = editPostSchema.validate(req.body);
        if (error) {
        return res.status(400).json({ error: "Estructura inválida.", message: error.details[0].message });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Ocurrió un error al validar la publicación."});
    }
};

module.exports = validateEditPost;
