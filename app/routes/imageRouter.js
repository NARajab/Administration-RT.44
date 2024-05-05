const router = require("express").Router();

const Image = require("../controller/imageController");
const multer = require("../middlewares/upload");

router.post("/:umkmId", multer.single("imageUrl"), Image.addImage);
router.get("/", Image.findAll);
router.get("/:umkmId", Image.findByIdUmkm);
router.patch("/:id", multer.single("imageUrl"), Image.updateImage);

module.exports = router;
