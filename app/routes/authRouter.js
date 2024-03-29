const router = require("express").Router();

const Auth = require("../controller/authController");
const authMe = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.post("/login", Auth.login);
router.get("/authme", authMe, Auth.authenticate);
router.patch("/update/:userId", authMe, Auth.updateNewPassword);
router.patch("/forgot/:userId", Auth.forgotPassword);

module.exports = router;
