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