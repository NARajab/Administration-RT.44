const router = require("express").Router();

const User = require("../controller/userController");
const authMe = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");
const multer = require("../middlewares/upload");

const allowedRoles = ["sekretaris", "superAdmin"];

router.get("/", authMe, checkRole(allowedRoles), User.getAllUsers);
router.get("/get/:id?", authMe, checkRole(allowedRoles), User.getOneUser);
router.post("/create", authMe, checkRole(["sekretaris"]), User.createUser);
router.patch("/update/:id", authMe, multer.single("image"), User.updateUser);
router.delete("/delete/:id", authMe, checkRole(allowedRoles), User.deleteUser);
module.exports = router;
