const User = require("../models/user");

const validateUserNameExists = async (req,res,next) => {
    try {
        const nickName = req.body.nickName.trim().toLowerCase();

        const user = await User.findOne({ nickName: nickName });
        
        if (user) {
            return res.status(409).json({message:`Ya existe un usuario con el nickname ${nickName}.`});
        }
        next();
    } catch (error) {
        console.error("Error al validar el usuario:", error);
        res.status(500).json({message:"Ocurrió un error al validar el usuario."});
    }
};

module.exports = validateUserNameExists;