const Tag  = require("../models/tag");

const validateTagNameExists = async (req,res,next) => {
    try {
        const tag = req.tag;
        const { nombre } = req.body;

          const existente = await Tag.findOne({ nombre });


        // Permite conservar el nombre actual del tag que se está editando.
        if (existente && existente._id.toString() !== tag._id.toString()) {
            return res.status(409).json({ message: `Ya existe un tag con el nombre ${nombre}.` });
        }
        
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Ocurrió un error al validar el tag."});
    }
};

module.exports = validateTagNameExists;
