const express = require("express");
const { getProfileOfTeacher, getCoursesOfTeacher, getStudentsOfAllCourses, getStudentsOfCourse } = require("../controllers/teacher/teacherController");

const router = express.Router();

router.get("/profile/:id", getProfileOfTeacher);
router.get("/courses/:id", getCoursesOfTeacher);
router.get("/Allstudents/:id", getStudentsOfAllCourses);
router.get("/studentsOfCourse/:id", getStudentsOfCourse);





module.exports = router;