const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users);
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Ocurrió un error al obtener los usuarios.",
    });
  }
};

const getUser = async (req, res) => {
  try {
      res.status(200).json(req.user);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Ocurrió un error al obtener el usuario." });
    }
};

const createUser = async (req, res) => {
  try {
    const nickName = req.body.nickName.trim().toLowerCase();

    await User.create({ nickName });

    res.status(201).json({ message: "Usuario creado con éxito." });
  } catch (error) {
      console.error(error)
      res.status(500).json({message: "Ocurrió un error al crear el usuario."});
  }
};

const editUser = async (req, res) => {
  try {
    const user = req.user;
    user.nickName = req.body.nickName.trim().toLowerCase();
    await user.save();

    res.status(200).json({
      message: `El usuario con ID ${user._id} fue editado con éxito.`,
    });
  } catch (error) {
      console.error(error)
      res.status(500).json({message: "Ocurrió un error al editar el usuario."});
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = req.user;

    // borrado en "cascada" de los registros asociados al usuario
    const posts = await Post.find({ user: user._id });
    await Comment.deleteMany({post: { $in: posts.map((post) => post._id) },});
    await Comment.deleteMany({ user: user._id });
    await Post.deleteMany({ user: user._id });

    await user.deleteOne();

    res.status(200).json({
      message: `El usuario con ID ${user._id} fue eliminado con éxito.`,
    });
  } catch (error) {
      console.error(error)
      res.status(500).json({message: "Ocurrió un error al eliminar el usuario."});
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  editUser,
  deleteUser,
};