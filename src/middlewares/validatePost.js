const { postSchema } = require("../schemas/postSchemas");

const validatePost = async (req,res,next) => {
    try {
        const { error } = postSchema.validate(req.body);
        if (error) {
        return res.status(400).json({ error: "Estructura inválida.", message: error.details[0].message });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Ocurrió un error al intentar validar el post."});
    }
};

module.exports = validatePost;