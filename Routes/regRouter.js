const express = require("express");
const regController = require("../controller/regController");
const router = express.Router();

router.get("/getAllReg")
router.post("/addReg", regController.addReg);


module.exports = router;