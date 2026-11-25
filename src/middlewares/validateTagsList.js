const Tag = require("../models/tag");

const validateTagsList = async (req,res,next) => {
    try {
        const tagsList = req.body.nombre;

        const repetido = tagsList.find((nombre, i) => tagsList.indexOf(nombre) !== i);
        if (repetido) {
            return res.status(400).json({ message: `El tag ${repetido} está repetido en la lista.`});
        }
        
            /*
            El $in significa “está dentro de esta lista”. 
            Busca documentos cuyo valor coincida con cualquiera de los valores indicados.
            */
        
        const existentes = await Tag.find({nombre: { $in: tagsList },}).select("nombre");
        
        if (existentes.length > 0) {
            const nombresExistentes = existentes.map(tag => tag.nombre);
            return res.status(409).json({ message: `Los siguientes tags ya existen: ${nombresExistentes.join(", ")}` });
        }
        req.tagsList = tagsList;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Ocurrió un error al validar el/los tag/s."});
    }
};

module.exports = validateTagsList;
