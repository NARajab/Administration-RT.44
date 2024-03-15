const router = require("express").Router();

const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../../docs/swagger.json");
const Auth = require("./authRouter");
const User = require("./userRouter");
const Umkm = require("./umkmRouter");

router.use("/api-docs", swaggerUI.serve);
router.use("/api-docs", swaggerUI.setup(swaggerDocument));
router.use("/api/v1/auth", Auth);
router.use("/api/v1/user", User);
router.use("/api/v1/umkm", Umkm);

module.exports = router;
