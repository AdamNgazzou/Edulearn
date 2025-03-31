const express = require("express");
const { getCoursesOfStudent, getTeachersOfStudent } = require("../controllers/studentController");

const router = express.Router();

router.get("/courses/:id", getCoursesOfStudent);
router.get("/teachers/:id", getTeachersOfStudent);

//router.post("/teachers", getTeachers);

module.exports = router;