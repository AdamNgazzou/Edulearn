const express = require("express");
const { getCoursesOfStudent } = require("../controllers/studentController");

const router = express.Router();

router.get("/courses/:id", getCoursesOfStudent);
//router.post("/teachers", getTeachers);

module.exports = router;