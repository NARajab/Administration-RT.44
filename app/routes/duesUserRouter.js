const router = require("express").Router();
const DuesUserController = require("../controller/duesUserController");

router.post("/obligat/:id", DuesUserController.createDuesObligate);
router.post("/voluntary/:id", DuesUserController.createDuesVoluntary);
router.get("/", DuesUserController.findAll);
router.get("/by-status", DuesUserController.findAllByStatus);

module.exports = router;
