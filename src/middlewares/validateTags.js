const { tagSchema } = require("../schemas/tagSchemas");

const validateTags = async (req,res,next) => {
    try {
        const { error } = tagSchema.validate(req.body);
        if (error) {
        return res.status(400).json({ error: "Estructura inválida.", message: error.details[0].message });
        }
        next();
    } catch (error) {
        res.status(500).json({message:"Ocurrió un error al intentar validar el tag."});
    }
};

module.exports = validateTags;
