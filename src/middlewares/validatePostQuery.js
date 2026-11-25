const { postQuerySchema } = require("../schemas/postSchemas");

const validatePostQuery = async (req, res, next) => {
    try {
        const { error } = postQuerySchema.validate(req.query);
        if (error) {
            return res.status(400).json({ error: "Filtro inválido.", message: error.details[0].message });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al intentar validar el filtro." });
    }
};

module.exports = validatePostQuery;