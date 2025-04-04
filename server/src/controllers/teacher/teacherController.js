const db = require("../../models/db"); // Import the database connection


exports.getProfileOfTeacher = async (req, res) => {
    // get profile of a teacher
    let client;
    const studentId = req.params.id;

    // Validate input
    if (!studentId || isNaN(studentId) || studentId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid teacher ID" });
    }

    try {
        client = await db.connect();

        // Query to fetch profile of a teacher
        const query = `
        SELECT i.id,u.id as userid, u.name, u.email, u.phone , u.location, u.image_url, u.bio, i.expertise, i.department,
            (SELECT array_agg(json_build_object('degree', e.degree, 'institution', e.institution, 'year', e.year))
            FROM education e
            WHERE e.instructor_id = i.id) AS education,
            (SELECT array_agg(json_build_object('id', c.id, 'title', c.title))
            FROM courses c
            WHERE c.instructor_id = i.id) AS courses
        FROM instructors i
        JOIN users u ON i.user_id = u.id
        WHERE i.id = $1;
        `;
        const { rows } = await client.query(query, [studentId]);

        // Check if  are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No profile found for this teacher" });
        }

        // Return the profile
        res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        console.error("Error fetching teacher profile:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};

exports.getCoursesOfTeacher = async (req, res) => {
    // get all Courses of a signle teacher by his id 
    let client;
    const Id = req.params.id;

    // Validate input
    if (!Id || isNaN(Id) || Id <= 0) {
        return res.status(400).json({ success: false, message: "Invalid teacher ID" });
    }

    try {
        client = await db.connect();

        // Query to fetch Courses of a signle teacher
        const query = `
        SELECT c.id, c.title, c.description, c.duration, COUNT(DISTINCT e.student_id) AS enrolled_students, c.is_published, c.level, COUNT(DISTINCT l.id) AS lesson_count
        FROM courses c
        LEFT JOIN enrollments e ON c.id = e.course_id
        LEFT JOIN modules m ON c.id = m.course_id
        LEFT JOIN lessons l ON m.id = l.module_id
        WHERE c.instructor_id = $1
        GROUP BY c.id, c.title, c.description, c.duration, c.is_published, c.level
        `;
        const { rows } = await client.query(query, [Id]);

        // Check if  are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No courses found for this teacher" });
        }

        // Return the Teachers
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error("Error fetching courses:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};

exports.getStudentsOfAllCourses = async (req, res) => {
    // get all Courses of a signle teacher by his id 
    let client;
    const Id = req.params.id;

    // Validate input
    if (!Id || isNaN(Id) || Id <= 0) {
        return res.status(400).json({ success: false, message: "Invalid teacher ID" });
    }

    try {
        client = await db.connect();

        // Query to fetch Courses of a signle teacher
        const query = `
        SELECT 
        c.id AS course_id,
        c.title AS course_title,
        json_agg(
            json_build_object(
            'student_id', s.id,
            'student_name', u.name,
            'email', u.email,
            'last_active', u.last_active,
            'status', s.status,
            'progress', e.progress
            )
        ) AS students,
        AVG(e.progress) AS average_course_progress
        FROM courses c
        JOIN enrollments e ON c.id = e.course_id
        JOIN students s ON e.student_id = s.id
        JOIN users u ON s.user_id = u.id
        WHERE c.instructor_id = $1
        GROUP BY c.id, c.title
        ORDER BY c.id;

        `;
        const { rows } = await client.query(query, [Id]);

        // Check if  are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No students found for this teacher" });
        }
        // Query to fetch Courses of a signle teacher
        const query2 = `
        SELECT 
        COUNT(DISTINCT e.student_id) AS total_students,
        COUNT(DISTINCT CASE WHEN s.status = 'banned' THEN e.student_id END) AS banned_students
        FROM 
            courses c
        JOIN 
            enrollments e ON c.id = e.course_id
        JOIN 
            students s ON e.student_id = s.id
        WHERE 
            c.instructor_id = $1
        `;
        const { rows: stats } = await client.query(query2, [Id]);
        if (stats.length === 0) {
            return res.status(404).json({ success: false, message: "No students found for this teacher" });
        }
        // Return the Teachers
        res.status(200).json({
            success: true,
            studentdata: rows,
            total_students: stats[0].total_students,
            banned_students: stats[0].banned_students
        });
    } catch (error) {
        console.error("Error fetching students:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};

exports.getStudentsOfCourse = async (req, res) => {
    // get students of a Course
    let client;
    const studentId = req.params.id;

    // Validate input
    if (!studentId || isNaN(studentId) || studentId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    try {
        client = await db.connect();

        // Query to fetch students of a course by courseid
        const query = `
        SELECT 
            c.id AS course_id, 
            c.title AS course_title, 
            c.is_published, 
            c.image_url AS course_image_url, 
            c.updated_at,
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'student_id', s.id,
                    'name', u.name,
                    'email', u.email,
                    'status', s.status,
                    'progress', e.progress,
                    'image_url', u.image_url
                )
            ) AS students
        FROM courses c
        JOIN enrollments e ON c.id = e.course_id
        JOIN students s ON e.student_id = s.id
        JOIN users u ON s.user_id = u.id
        WHERE c.id = $1
        GROUP BY c.id, c.title, c.is_published, c.image_url, c.updated_at
        `;
        const { rows } = await client.query(query, [studentId]);

        // Check if  are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No Students found for this courseid" });
        }

        // Return the profile
        res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        console.error("Error fetching Students:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};