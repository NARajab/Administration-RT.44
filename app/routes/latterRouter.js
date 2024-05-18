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
router.get("/:userId", Latter.findOnceUserLatterByUserId);
router.get("/:id", Latter.findOnceLatter);
router.get("/userlatter/status", Latter.findByStatus);
router.patch(
  "/update/:id",
  authMe,
  checkRole(["superAdmin"]),
  Latter.updateLatter
);
router.patch("/update/status/:latterId", Latter.updateStatus);

module.exports = router;
