const { Router } = require("express");
const router = Router()
const { getUsers, getUser, createUser, deleteUser, editUser } = require("../controllers/userControllers");
const searchUserId = require("../middlewares/searchUserId");
const validateUserNameExists = require("../middlewares/validateUserNameExists");
const validateUserName = require("../middlewares/validateUserName");

router.get("/", getUsers);
router.get("/:id", searchUserId, getUser);
router.post("/", validateUserName, validateUserNameExists, createUser);
router.put("/:id", validateUserName, searchUserId, validateUserNameExists, editUser);
router.delete("/:id", searchUserId, deleteUser);

module.exports = router;