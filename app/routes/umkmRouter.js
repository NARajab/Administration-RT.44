const router = require("express").Router();
const Umkm = require("../controller/umkmController");
const checkRole = require("../middlewares/checkRole");
const authMe = require("../middlewares/authentication");

router.post("/create", authMe, checkRole(["superAdmin"]), Umkm.createUmkm);

router.get("/", Umkm.getAllUmkm);

router.get("/get/:id?", Umkm.getOnceUmkm);

router.patch("/update/:id", authMe, checkRole(["superAdmin"]), Umkm.updateUmkm);

module.exports = router;
