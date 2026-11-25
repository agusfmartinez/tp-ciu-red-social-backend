const { Router } = require("express");
const router = Router()
const { getPosts, createPost, getPost, deletePost, editPost, addImages, deleteImage, uploadImages } = require("../controllers/postControllers");
const searchPostId = require("../middlewares/searchPostId");
const validatePost = require("../middlewares/validatePost");
const validateEditPost = require("../middlewares/validateEditPost");
const validateAddImages = require("../middlewares/validateAddImages");
const searchUserId = require("../middlewares/searchUserId");
const validateImagesExists = require("../middlewares/validateImagesExists");
const validateUploadImages = require("../middlewares/validateUploadImages");
const validatePostOwner = require("../middlewares/validatePostOwner");
const validateUploadImagesExists = require("../middlewares/validateUploadImagesExists");
const validatePostQuery = require("../middlewares/validatePostQuery");

router.get("/", validatePostQuery, getPosts);
router.post("/", validatePost, searchUserId, createPost);
router.get("/:id", searchPostId, getPost);
router.patch("/:id", searchPostId, validateEditPost, validatePostOwner, editPost);
router.delete("/:id", searchPostId, validatePostOwner, deletePost);
router.post("/:id/images", searchPostId, validateAddImages, validatePostOwner, addImages);
router.delete("/:id/images/:imageId", searchPostId, validatePostOwner, validateImagesExists, deleteImage);
router.post("/:id/images/upload", searchPostId, validateUploadImages, validateUploadImagesExists, validatePostOwner, uploadImages);

module.exports = router;