const express = require("express");
const { getCoursesOfStudent, getTeachersOfStudent, getProfileOfStudent, getCoursesProfileStudent } = require("../controllers/student/studentController");
const { getCourseStudent, getCourseInfoStudent } = require("../controllers/student/courseController");

const router = express.Router();

router.get("/courses/:id", getCoursesOfStudent);
router.get("/course/:studentId/:courseId", getCourseStudent);
router.get("/courseinfo/:studentId/:courseId", getCourseInfoStudent);


router.get("/teachers/:id", getTeachersOfStudent);
router.get("/profile/:id", getProfileOfStudent);
router.get("/profile/courses/:id", getCoursesProfileStudent);


//router.post("/teachers", getTeachers);

module.exports = router;