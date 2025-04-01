const db = require("../models/db"); // Import the database connection

exports.getCoursesOfStudent = async (req, res) => {
    // get all Courses of a signle student by his id /student/courses/:id
    let client;
    const studentId = req.params.id;

    // Validate input
    if (!studentId || isNaN(studentId) || studentId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    try {
        client = await db.connect();

        // Query to fetch courses for the student
        const query = `
            SELECT c.id, c.title, c.duration, e.progress, c.image_url, u.name AS instructor_name, COUNT(l.id) AS lesson_count
            FROM courses c
            JOIN enrollments e ON c.id = e.course_id
            JOIN instructors i ON c.instructor_id = i.id
            JOIN users u ON i.user_id = u.id
            LEFT JOIN modules m ON c.id = m.course_id
            LEFT JOIN lessons l ON m.id = l.module_id
            WHERE e.student_id = $1
            GROUP BY c.id, c.title, c.duration, e.progress, c.image_url, u.name
        `;
        const { rows } = await client.query(query, [studentId]);

        // Check if courses are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No courses found for this student" });
        }

        // Return the courses
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error("Error fetching courses:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};

exports.getTeachersOfStudent = async (req, res) => {
    // get all Teachers of a signle student by his id /student/teacher/:id
    let client;
    const studentId = req.params.id;

    // Validate input
    if (!studentId || isNaN(studentId) || studentId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    try {
        client = await db.connect();

        // Query to fetch teachers for the student
        const query = `
            SELECT i.id , 
                   u.name , 
                   i.bio, 
                   u.phone, 
                   u.email, 
                   u.image_url, 
                   COALESCE(ARRAY_AGG(DISTINCT JSONB_BUILD_OBJECT('id', c.id, 'title', c.title)) 
                   FILTER (WHERE c.id IS NOT NULL), '{}') AS courses
            FROM students s
            JOIN enrollments e ON s.id = e.student_id
            JOIN courses c ON e.course_id = c.id
            JOIN instructors i ON c.instructor_id = i.id
            JOIN users u ON i.user_id = u.id
            WHERE s.id = $1
            GROUP BY i.id, u.name, i.bio, u.phone, u.email, u.image_url;
        `;
        const { rows } = await client.query(query, [studentId]);

        // Check if  are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No teachers found for this student" });
        }

        // Return the Teachers
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error("Error fetching teachers:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};
exports.getProfileOfStudent = async (req, res) => {
    // get all Teachers of a signle student by his id /student/teacher/:id
    let client;
    const studentId = req.params.id;

    // Validate input
    if (!studentId || isNaN(studentId) || studentId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    try {
        client = await db.connect();

        // Query to fetch teachers for the student
        const query = `
        SELECT 
            u.id, 
            u.name, 
            u.email, 
            u.phone, 
            u.location, 
            u.image_url, 
            u.bio, 
            s.program, 
            s.enrollment_date as enrollmentDate,
            ARRAY(SELECT i.title FROM interests i JOIN student_interests si ON i.id = si.interest_id WHERE si.student_id = s.id) as interests,
            ARRAY(
                SELECT json_build_object(
                    'title', a.title, 
                    'description', a.description, 
                    'date', a.date
                )
                FROM achievements a 
                WHERE a.student_id = s.id
            ) as achievements
        FROM 
            users u
        JOIN 
            students s ON u.id = s.user_id
        WHERE 
            s.id = $1
        `;
        const { rows } = await client.query(query, [studentId]);

        // Check if  are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No teachers found for this student" });
        }

        // Return the Teachers
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error("Error fetching teachers:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};

exports.getCoursesProfileStudent = async (req, res) => {
    // get all courses completed and not completed of a signle student by his id /student/teacher/:id
    let client;
    const studentId = req.params.id;

    // Validate input
    if (!studentId || isNaN(studentId) || studentId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    try {
        client = await db.connect();

        // Query to completed course data for the student
        const query = `
            SELECT c.id , c.title , i.id , u.name , AVG(sa.grade) AS grade
            FROM courses c
            JOIN enrollments e ON c.id = e.course_id
            JOIN instructors i ON c.instructor_id = i.id
            JOIN users u ON i.user_id = u.id
            LEFT JOIN assignment_lessons al ON al.lesson_id IN (SELECT l.id FROM lessons l JOIN modules m ON l.module_id = m.id WHERE m.course_id = c.id)
            LEFT JOIN student_assignments sa ON sa.assignment_id = al.id AND sa.student_id = e.student_id
            WHERE e.student_id = $1 AND e.progress = 100
            GROUP BY c.id, c.title, i.id, u.name
        `;
        const completedCoursesResult = await client.query(query, [studentId]);
        const completedCourses = completedCoursesResult.rows;

        // Query to incompleted course data for the student
        const query2 = `
            SELECT c.id, c.title, e.progress, i.id AS instructorid, u.name AS instructorname, 
                SUM(e.progress) OVER () AS total_progress
            FROM enrollments e
            JOIN courses c ON e.course_id = c.id
            JOIN instructors i ON c.instructor_id = i.id
            JOIN users u ON i.user_id = u.id
            WHERE e.student_id = $1 AND e.progress < 100
        `;
        const inCompletedCoursesResult = await client.query(query2, [studentId]);
        const inCompletedCourses = inCompletedCoursesResult.rows;

        // Check if  are found
        if (inCompletedCourses.length === 0 && completedCourses.length === 0) {
            return res.status(404).json({ success: false, message: "No data found for this student" });
        }

        // Return the data
        res.status(200).json({ success: true, completedCourses: completedCourses, inCompletedCourses: inCompletedCourses });
    } catch (error) {
        console.error("Error fetching data:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};

