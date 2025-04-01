const express = require("express");
const { getCoursesOfStudent, getTeachersOfStudent, getProfileOfStudent, getCoursesProfileStudent } = require("../controllers/studentController");

const router = express.Router();

router.get("/courses/:id", getCoursesOfStudent);
router.get("/teachers/:id", getTeachersOfStudent);
router.get("/profile/:id", getProfileOfStudent);
router.get("/profile/courses/:id", getCoursesProfileStudent);


//router.post("/teachers", getTeachers);

module.exports = router;