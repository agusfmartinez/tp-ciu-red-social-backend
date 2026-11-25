const Post = require("../models/post");
const Tag = require("../models/tag");
const Comment = require("../models/comment");

const fs = require('fs').promises;

const getPosts = async (req, res) => {
    try {
        // filtro opcional por usuario: /posts?userId=...
        const { userId } = req.query;
        const filtro = userId ? { user: userId } : {};

        const posts = await Post.find(filtro)
            .populate("user", "nickName")
            .populate("tags", "nombre")
            .populate("commentsCount");
        
        res.status(200).json(posts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al obtener las publicaciones." });
    }
};

const getPost = async (req, res) => {
    try {
        const post = req.post
        res.status(200).json(post)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al obtener la publicación." });
    }
};

const createPost = async (req, res) => {
    try {
        const { descripcion, userId, tags = [], images = [] } = req.body;
    
        // saca tags duplicados
        const tagsUnicos = tags.filter((nombre, i) => tags.indexOf(nombre) === i);

        // busca los tags que ya existen
        const tagsExistentes = await Tag.find({ nombre: tagsUnicos });

        // crea los que no existen
        const nombresNuevos = tagsUnicos.filter(nombre => !tagsExistentes.some(tag => tag.nombre === nombre));
        const tagsNuevos = await Tag.insertMany(nombresNuevos.map(nombre => ({ nombre: nombre })));

        // crea el post: tags referenciados (solo _id) e imagenes embebidas
        const post = new Post({
            descripcion: descripcion,
            user: userId,
            tags: [...tagsExistentes, ...tagsNuevos].map(tag => tag._id),
            images: images.map(url => ({ url: url }))
        });
        await post.save();

        // devuelvo el post completo
        const postCreado = await Post.findById(post._id)
            .populate("user", "nickName")
            .populate("tags", "nombre");

        res.status(201).json({
            message: "Publicación creada con éxito.",
            post: postCreado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al crear la publicación." });
    }
};

const editPost = async (req, res) => {
    try {
        const post = req.post
        // edicion de Post con PATCH, descripcion y tags son opcionales
        // no se editan user ni imagenes
        const { descripcion, tags } = req.body

        if (descripcion) {
            post.descripcion = descripcion;
        }
        
        if (tags){
            // saca tags duplicados
            const tagsUnicos = tags.filter((nombre, i) => tags.indexOf(nombre) === i);
    
            // busca los tags que ya existen
            const tagsExistentes = await Tag.find({ nombre: tagsUnicos });
    
            // crea los que no existen
            const nombresNuevos = tagsUnicos.filter(nombre => !tagsExistentes.some(tag => tag.nombre === nombre));
            await Tag.insertMany(nombresNuevos.map(nombre => ({ nombre: nombre })));
    
            // obtiene todos los tags del post, existentes y nuevos
            const tagsDelPost = await Tag.find({ nombre: tags })
    
            post.tags = tagsDelPost.map(tag => tag._id);
        }

        await post.save();

        // devuelvo el post actualizado con sus tags
        const postActualizado = await Post.findById(post._id)
            .populate("tags", "nombre");

        res.status(200).json({
            message: `El Post con ID ${postActualizado.id} fue actualizado con éxito.`,
            post: postActualizado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al actualizar la publicación." });
    }
};

const deletePost = async (req, res) => {
    try {
        const post = req.post;
        const files = post.images.filter(i => i.url.startsWith('/uploads/'));
        files.forEach(f => { fs.unlink(`./${f.url}`) });
        await Comment.deleteMany({ post: post._id });
        await post.deleteOne()
        res.status(200).json({ message: `El Post con ID ${post.id} fue eliminado con éxito.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al eliminar la publicación." });
    }
};

// agrega imagenes a un post existente
const addImages = async (req, res) => {
    try {
        const post = req.post
        const { images } = req.body;
        // el dueño del post se valida en el middleware validatePostOwner

        // agrega array incrustado las urls
        post.images.push(...images.map(url => ({ url: url })));
        await post.save();

        // devuelvo el post actualizado con sus imagenes
        const postActualizado = await Post.findById(post._id)
            .select("descripcion fecha images");

        res.status(201).json({
            message: "Imágenes agregadas al post con éxito.",
            post: postActualizado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al agregar las imágenes." });
    }
};

// quitar imagenes a un post existente
const deleteImage = async (req, res) => {
    try {
        const imagen = req.imagen;
        const post = req.post;
        // el dueño del post se valida en el middleware validatePostOwner
        
        // deja en el array todas las imagenes menos la que se quiere borrar
        post.images = post.images.filter(img => img._id.toString() !== imagen._id.toString());
        
        if (imagen.url.startsWith('/uploads/')) {
            fs.unlink(`./${imagen.url}`)
        }
    
        await post.save();

        // devuelvo el post actualizado con sus imagenes
        const postActualizado = await Post.findById(post._id)
            .select("descripcion fecha images");

        res.status(200).json({
            message: `La imagen con ID ${imagen.id} fue eliminada con éxito.`,
            post: postActualizado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al eliminar la imagen." });
    }
};


// sube archivos de imagen a un post existente
const uploadImages = async (req, res) => {
    try {
        const post = req.post
        const archivos = req.files

        // el dueño del post se valida en el middleware validatePostOwner

        // agrega al array incrustado la url donde quedo guardado cada archivo
        post.images.push(...archivos.map(archivo => ({ url: `/uploads/${archivo.filename}` })));
        await post.save();

        // devuelvo el post actualizado con sus imagenes
        const postActualizado = await Post.findById(post._id)
            .select("descripcion fecha images");

        res.status(201).json({
            message: "Imágenes subidas al post con éxito.",
            post: postActualizado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ocurrió un error al subir las imágenes." });
    }
};


module.exports = {
    getPosts,
    createPost,
    getPost,
    deletePost,
    editPost,
    addImages,
    deleteImage,
    uploadImages
};







