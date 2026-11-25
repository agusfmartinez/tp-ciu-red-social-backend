const Tag = require("../models/tag");
const Post = require("../models/post");

const getTags = async (req, res) => {
    try {

        const tags = await Tag.find()
        res.status(200).json(tags);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al obtener los tags." });
    }
};

const getTag = async (req, res) => {
    try {
        res.status(200).json(req.tag);
    } catch (error) {
        res.status(500).json({ message: "Ocurrió un error al obtener el tag." });
    }
};

const createTags = async (req, res) => {
    try {
        const nombres = req.tagsList;

        const tags = await Tag.insertMany(nombres.map((nombre) => ({ nombre })));

        res.status(201).json({
            message: "Tag/s creado/s con éxito.",
            tags: tags.map(t => ({
                id: t.id,
                nombre: t.nombre
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al crear los tags." });
    }
};

const editTag = async (req, res) => {
    try {
        const tag = req.tag;
        const { nombre } = req.body;

        tag.nombre = nombre;
        await tag.save();

        res.status(200).json({ message: `El tag con ID ${tag.id} fue editado con éxito.` });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Ocurrió un error al editar el tag." });
    }
};

const deleteTag = async (req, res) => {
    try {
        const tag = req.tag;
        await Post.updateMany(
            { tags: tag._id },
            { $pull: { tags: tag._id } }
        );
        await tag.deleteOne();
        res.status(200).json({ message: `El tag con ID ${tag.id} fue eliminado con éxito.` });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Ocurrió un error al eliminar el tag." });
    }
};

module.exports = {
    getTags,
    getTag,
    createTags,
    editTag,
    deleteTag,
};
