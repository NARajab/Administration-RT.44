const router = require("express").Router();

const Dues = require("../controller/duesController");

router.post("/voluntary", Dues.createDuesVoluntary);
router.get("/", Dues.findAllDues);
router.get("/by-month", Dues.findAllDuesByMonth);

module.exports = router;
