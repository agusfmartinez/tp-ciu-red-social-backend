const { addImagesSchema } = require("../schemas/postSchemas");

const validateAddImages = (req,res,next) => {
    try {
        const { error } = addImagesSchema.validate(req.body);
        if (error) {
        return res.status(400).json({ error: "Estructura inválida.", message: error.details[0].message });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Ocurrió un error al validar las imágenes."});
    }
};

module.exports = validateAddImages;
