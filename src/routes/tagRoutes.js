const { Router } = require("express");
const router = Router()
const { getTags, getTag, createTags, editTag, deleteTag } = require("../controllers/tagControllers");
const searchTagId = require("../middlewares/searchTagId");
const validateTags = require("../middlewares/validateTags");
const validateTagsList = require("../middlewares/validateTagsList");
const validateEditTag = require("../middlewares/validateEditTag");
const validateTagNameExists = require("../middlewares/validateTagNameExists");

router.get("/", getTags);
router.get("/:id", searchTagId, getTag);
router.post("/",validateTags, validateTagsList, createTags);
router.put("/:id", searchTagId, validateEditTag, validateTagNameExists, editTag);
router.delete("/:id", searchTagId, deleteTag);
module.exports = router;
