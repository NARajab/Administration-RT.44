const router = require("express").Router();

const User = require("../controller/userController");
const authMe = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

const allowedRoles = ["sekretaris", "superAdmin"];

router.get("/", authMe, checkRole(allowedRoles), User.getAllUsers);
router.get("/get/:id?", authMe, checkRole(allowedRoles), User.getOneUser);
router.post("/create", authMe, checkRole(["sekretaris"]), User.createUser);
router.patch("/update/:id", authMe, User.updateUser);
router.patch("/update/:id", authMe, checkRole(["sekretaris"]), User.updateUser);

module.exports = router;
