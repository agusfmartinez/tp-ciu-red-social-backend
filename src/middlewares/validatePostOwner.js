// valida que el userId recibido sea el dueño del post (req.post lo carga searchPostId)
const validatePostOwner = (req,res,next) => {
    try {
        const userId = req.body && req.body.userId;

        if (!userId) {
            return res.status(400).json({ error: "Estructura inválida.", message: "El campo userId es obligatorio." });
        }
        // post.user viene populado: se compara su _id (ObjectId) pasado a string con el userId recibido
        if (!req.post.user || req.post.user._id.toString() !== userId) {
            return res.status(403).json({ message: "El usuario no es el dueño de la publicación." });
        }
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al validar el dueño de la publicación." });
    }
};

module.exports = validatePostOwner;
