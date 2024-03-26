const express = require("express");
const {verifyAccessToken} = require("../Helpers/jwtHelpers")
const studentController = require("../controller/studentController");
const router = express.Router();

router.get("/gettAllStudent", verifyAccessToken,studentController.getAllStudent);
router.get("/getAllStudent", studentController.getAllStudent);
router.get("/getStudent/:id", studentController.getStudent);
router.post("/addStudent", studentController.addStudent);
router.patch("/updateStudent/:id", studentController.updateStudent);
router.delete("/deleteStudent/:id", studentController.deleteStudent);

module.exports = router;