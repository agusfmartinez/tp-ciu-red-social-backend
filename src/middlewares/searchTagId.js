const Tag = require("../models/tag");
const mongoose = require("mongoose");

const searchTagId = async (req,res,next) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({ message: "ID de Tag inexistente." });
        }

        const tag = await Tag.findById(id).select("-__v");
        if (!tag) {
            return res.status(404).json({message:"ID de tag inexistente."});
        }

        req.tag = tag;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Ocurrió un error al intentar obtener el tag."});
    }
};

module.exports = searchTagId;
