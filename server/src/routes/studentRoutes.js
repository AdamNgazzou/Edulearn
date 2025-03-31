const express = require("express");
const { getCoursesOfStudent, getTeachersOfStudent, getProfileOfStudent } = require("../controllers/studentController");

const router = express.Router();

router.get("/courses/:id", getCoursesOfStudent);
router.get("/teachers/:id", getTeachersOfStudent);
router.get("/profile/:id", getProfileOfStudent);

//router.post("/teachers", getTeachers);

module.exports = router;