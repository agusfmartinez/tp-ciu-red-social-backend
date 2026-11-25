const validateImagesExists = async (req,res,next) => {
    try {
        const post = req.post
        const { imageId } = req.params;
        
        const imagen = post.images.find(img => img._id.toString() === imageId);
        
        if (!imagen) {
            return res.status(404).json({ message: `La imagen con ID ${imageId} no existe en esta publicación.`});
        }
        
        req.imagen = imagen;
        next();
    } catch (error) {
        res.status(500).json({message:"Ocurrió un error al validar la imágen."});
    }
};

module.exports = validateImagesExists;