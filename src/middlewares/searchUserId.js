const mongoose = require("mongoose");
const User = require("../models/user");

const searchUserId = async (req, res, next) => {
    try {
        const userId = req.params.id || req.body.userId;

        if (!userId || !mongoose.isValidObjectId(userId)) {
            return res.status(400).json({
                message: "El ID de usuario tiene un formato inválido.",
            });
        }

        const user = await User.findById(userId).select("_id nickName");
        
        if (!user) {
            return res.status(404).json({ message: "ID de usuario inexistente." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Ocurrió un error al obtener el usuario." });
    }
};

module.exports = searchUserId;