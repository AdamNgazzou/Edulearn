const express = require("express");
const { getProfileOfTeacher, getCoursesOfTeacher, getStudentsOfCourses } = require("../controllers/teacherController");

const router = express.Router();

router.get("/profile/:id", getProfileOfTeacher);
router.get("/courses/:id", getCoursesOfTeacher);
router.get("/students/:id", getStudentsOfCourses);




module.exports = router;