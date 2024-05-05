const router = require("express").Router();

const Latter = require("../controller/latterController");
const authMe = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.post("/create/:id", Latter.createLatter);
router.get("/userlatter", Latter.findAllUserLatter);
router.get("/", authMe, checkRole(["superAdmin"]), Latter.findAllLatter);
router.get(
  "/get/:userId?/:latterId?",
  authMe,
  checkRole(["superAdmin"]),
  Latter.findOnceUserLatter
);
router.get("/:id", Latter.findOnceLatter);
router.patch(
  "/update/:id",
  authMe,
  checkRole(["superAdmin"]),
  Latter.updateLatter
);

module.exports = router;
