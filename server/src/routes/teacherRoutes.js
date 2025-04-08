const express = require("express");
const { getProfileOfTeacher, getCoursesOfTeacher, getStudentsOfAllCourses, getStudentsOfCourse } = require("../controllers/teacher/teacherController");
const { getResourcesCourseTeacher, getStudentsOfCoursetab, getinfoCourse, PostAnnouncement, GetAnnouncement, DeleteAnnouncement, ModifyAnnouncement, GetCourseModulesLessons, PostModule, ModifyModule, DeleteModule } = require("../controllers/teacher/courseController");

const router = express.Router();

router.get("/profile/:id", getProfileOfTeacher);
router.get("/courses/:id", getCoursesOfTeacher);
router.get("/Allstudents/:id", getStudentsOfAllCourses);
router.get("/studentsOfCourse/:id", getStudentsOfCourse);

router.get("/resourcesCourse/:id", getResourcesCourseTeacher);
router.get("/studentsCourse/:id", getStudentsOfCoursetab);
router.get("/infocourse/:id", getinfoCourse);

router.get("/announcement/:id", GetAnnouncement);
router.post("/announcement/:id", PostAnnouncement);
router.delete("/announcement/:id", DeleteAnnouncement);
router.put("/announcement/:id", ModifyAnnouncement);

router.get("/modulesLessons/:id", GetCourseModulesLessons);

router.post("/module/:id", PostModule);
router.put("/module/:id", ModifyModule);
router.delete("/module/:id", DeleteModule);






module.exports = router;