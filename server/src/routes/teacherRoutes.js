const express = require("express");
const { getProfileOfTeacher, getCoursesOfTeacher, getStudentsOfAllCourses, getStudentsOfCourse } = require("../controllers/teacher/teacherController");
const { getResourcesCourseTeacher, getStudentsOfCoursetab, getinfoCourse } = require("../controllers/teacher/courseController");

const router = express.Router();

router.get("/profile/:id", getProfileOfTeacher);
router.get("/courses/:id", getCoursesOfTeacher);
router.get("/Allstudents/:id", getStudentsOfAllCourses);
router.get("/studentsOfCourse/:id", getStudentsOfCourse);

router.get("/resourcesCourse/:id", getResourcesCourseTeacher);
router.get("/studentsCourse/:id", getStudentsOfCoursetab);
router.get("/infocourse/:id", getinfoCourse);




module.exports = router;