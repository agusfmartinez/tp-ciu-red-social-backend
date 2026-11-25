const validateUploadImagesExists = async (req,res,next) => {
    try {
        const archivos = req.files
        console.log(archivos)
        if (!archivos || archivos.length === 0) {
            return res.status(400).json({ message: "Debe enviar al menos una imagen en el campo images." });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Ocurrió un error al validar la carga del archivo."});
    }
};

module.exports = validateUploadImagesExists;
