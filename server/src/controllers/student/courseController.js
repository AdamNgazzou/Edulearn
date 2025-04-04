const db = require("../../models/db"); // Import the database connection


exports.getCourseStudent = async (req, res) => {
    // get all course  of a signle student by his id and course id
    let client;
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    // Validate input
    if ((!studentId || isNaN(studentId) || studentId <= 0) || (!courseId || isNaN(courseId) || courseId <= 0)) {
        return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    try {
        client = await db.connect();

        // Query to course for the student
        const query = `
        SELECT 
            c.id, c.title, c.image_url,c.updated_at, c.level, c.duration, 
            (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id) AS numberofstudents,
            (SELECT AVG(CAST(review AS FLOAT)) FROM courses WHERE id = c.id) AS rating,
            (SELECT COUNT(*) FROM courses WHERE id = c.id AND review IS NOT NULL) AS reviews,
            e.progress,
            u.name AS instructor_name, u.image_url AS instructor_image_url,
            (SELECT COUNT(*) FROM lessons l JOIN modules m ON l.module_id = m.id WHERE m.course_id = c.id) AS totallessons,
            (SELECT COUNT(*) FROM lessons l JOIN modules m ON l.module_id = m.id WHERE m.course_id = c.id AND l.iscompleted = TRUE) AS totalcompleted
        FROM 
            courses c
        JOIN 
            instructors i ON c.instructor_id = i.id
        JOIN 
            users u ON i.user_id = u.id
        JOIN 
            enrollments e ON c.id = e.course_id
        WHERE 
            c.id = $2 AND e.student_id = $1
        `;
        const { rows } = await client.query(query, [studentId, courseId]);

        // Check if  are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No course found for this student" });
        }

        // Return the data
        res.status(200).json({ success: true, data: rows[0], });
    } catch (error) {
        console.error("Error fetching course:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};

exports.getCourseInfoStudent = async (req, res) => {
    // get all course  of a signle student by his id and course id
    let client;
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    // Validate input
    if ((!studentId || isNaN(studentId) || studentId <= 0) || (!courseId || isNaN(courseId) || courseId <= 0)) {
        return res.status(400).json({ success: false, message: "Invalid student ID" });
    }

    try {
        client = await db.connect();

        // Query to course for the student
        const query = `
        SELECT 
            COUNT(DISTINCT l.id) AS lesson_count,
            (
                SELECT COUNT(DISTINCT r1.id)
                FROM resources r1
                WHERE r1.course_id = c.id AND r1.type = 'file'
            ) AS file_resource_count,
            c.level AS course_level,
            c.duration,
            (
                SELECT COUNT(*)
                FROM enrollments
                WHERE course_id = c.id
            ) AS total_students_enrolled,
            c.updated_at,
            c.description AS course_description,
            c.learningoutcomes,
            c.prerequisites,
            (
                SELECT json_agg(DISTINCT jsonb_build_object(
                    'id' , r2.id,
                    'title', r2.title,
                    'type', r2.type,
                    'url', r2.url
                ))
                FROM resources r2
                WHERE r2.course_id = c.id
            ) AS resources,
            u.name AS instructorname,
            i.bio AS instructorbio,
            u.image_url AS instructorimage_url
        FROM 
            courses c
        LEFT JOIN 
            modules m ON c.id = m.course_id
        LEFT JOIN 
            lessons l ON m.id = l.module_id
        LEFT JOIN 
            enrollments e ON c.id = e.course_id
        LEFT JOIN 
            instructors i ON c.instructor_id = i.id
        LEFT JOIN 
            users u ON i.user_id = u.id
        WHERE 
            e.student_id = $1
            AND c.id = $2
        GROUP BY 
            c.id, c.level, c.duration, c.updated_at, c.description, c.learningoutcomes, c.prerequisites, u.name, i.bio, u.image_url;

        `;
        const { rows } = await client.query(query, [studentId, courseId]);

        // Check if  are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No course found for this student" });
        }

        // Return the data
        res.status(200).json({ success: true, data: rows[0], });
    } catch (error) {
        console.error("Error fetching course:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};
