const express = require("express");
const courseController = require("../Controller/CourseController");
const router = express.Router();

router.post("/addCourse", courseController.addCourse);

module.exports = router;