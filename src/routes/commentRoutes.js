const { Router } = require("express");
const router = Router()
const { getComments, getComment, createComment,editComment,deleteComment } = require("../controllers/commentControllers");
const searchCommentId = require("../middlewares/searchCommentId");
const validateComment = require("../middlewares/validateComment");
const searchUserId = require("../middlewares/searchUserId");
const searchPostId = require("../middlewares/searchPostId");
const validateEditComment = require("../middlewares/validateEditComment");
const validateCommentOwner = require("../middlewares/validateCommentOwner");

router.get("/", getComments);
router.get("/:id", searchCommentId, getComment);
router.post("/",validateComment, searchPostId, searchUserId, createComment);
router.put("/:id", searchCommentId, validateEditComment, validateCommentOwner, editComment);
router.delete("/:id", searchCommentId, validateCommentOwner, deleteComment);

module.exports = router;
