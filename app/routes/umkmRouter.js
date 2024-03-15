const router = require("express").Router();
const Umkm = require("../controller/umkmController");
const multer = require("../middlewares/upload");
const checkRole = require("../middlewares/checkRole");
const authMe = require("../middlewares/authentication");

router.post(
  "/create",
  authMe,
  checkRole(["superAdmin"]),
  multer.single("image"),
  Umkm.createUmkm
);
router.get("/", Umkm.getAllUmkm);
router.get("/get/:id?", Umkm.getOnceUmkm);
router.patch(
  "/update/:id",
  authMe,
  checkRole(["superAdmin"]),
  multer.single("image"),
  Umkm.updateUmkm
);

module.exports = router;
