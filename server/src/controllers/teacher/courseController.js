const db = require("../../models/db"); // Import the database connection


exports.getResourcesCourseTeacher = async (req, res) => {
    // get resources of a course
    let client;
    const courseId = req.params.id;

    // Validate input
    if (!courseId || isNaN(courseId) || courseId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    try {
        client = await db.connect();

        // Query to fetch resources of a course
        const query = `
        SELECT id, title,description, type, url FROM resources WHERE course_id = $1
        `;
        const { rows } = await client.query(query, [courseId]);

        // Check if  are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No resources found for this course" });
        }

        // Return the profile
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error("Error fetching resources profile:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};
exports.getStudentsOfCoursetab = async (req, res) => {
    // get students of a Course
    let client;
    const courseId = req.params.id;

    // Validate input
    if (!courseId || isNaN(courseId) || courseId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    try {
        client = await db.connect();

        // Query to fetch students of a course by courseid
        const query = `
            WITH student_progress AS (
                SELECT 
                    u.id AS student_id,
                    u.name,
                    u.email,
                    u.image_url,
                    COUNT(slp.lesson_id) AS lessonscompleted
                FROM students s
                JOIN users u ON u.id = s.user_id
                LEFT JOIN student_lesson_progress slp 
                    ON slp.student_id = s.id AND slp.iscompleted = true
                WHERE s.id IN (
                    SELECT e.student_id 
                    FROM enrollments e 
                    WHERE e.course_id = $1
                )
                GROUP BY u.id, u.name, u.email
            ),
            lesson_count AS (
                SELECT COUNT(DISTINCT l.id) AS lessonscount
                FROM courses c
                JOIN modules m ON m.course_id = c.id
                JOIN lessons l ON l.module_id = m.id
                WHERE c.id = $1
            )
            SELECT 
                lc.lessonscount,
                json_agg(
                    json_build_object(
                        'id', sp.student_id,
                        'name', sp.name,
                        'email', sp.email,
                        'lessonscompleted', COALESCE(sp.lessonscompleted, 0),
                        'image_url', sp.image_url
                    )
                ) AS students
            FROM lesson_count lc
            LEFT JOIN student_progress sp ON true
            GROUP BY lc.lessonscount;
        `;
        const { rows } = await client.query(query, [courseId]);

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

exports.getinfoCourse = async (req, res) => {
    // get info of a Course
    let client;
    const courseId = req.params.id;

    // Validate input
    if (!courseId || isNaN(courseId) || courseId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    try {
        client = await db.connect();

        // Query to fetch information of a course by courseid
        const query = `
            SELECT 
                c.title ,
                c.id ,
                c.is_published,
                c.level,
                c.description,
                c.category,
                c.image_url,
                c.duration,
                COUNT(DISTINCT l.id) AS lessons,
                COUNT(DISTINCT e.student_id) AS students,
                c.updated_at,
                COUNT(DISTINCT m.id) AS modules,
                COUNT(DISTINCT al.id) AS assignements
            FROM 
                courses c
            LEFT JOIN 
                modules m ON c.id = m.course_id
            LEFT JOIN 
                lessons l ON m.id = l.module_id
            LEFT JOIN 
                assignment_lessons al ON l.id = al.lesson_id
            LEFT JOIN 
                enrollments e ON c.id = e.course_id
            WHERE 
                c.id = $1
            GROUP BY 
                c.id, c.title, c.is_published, c.level, c.description, c.category, c.duration, c.updated_at
        `;
        const { rows } = await client.query(query, [courseId]);

        // Check if  are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No information found for this course" });
        }

        // Return the course
        res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        console.error("Error fetching course:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};

exports.PostAnnouncement = async (req, res) => {
    // get courseId and other needed things
    let client;
    const courseId = req.params.id;
    const { title, content } = req.body;
    // Validate input
    if (!courseId || isNaN(courseId) || courseId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    try {
        client = await db.connect();

        // Query to post information of a announcement by courseid
        const query = `
            INSERT INTO announcements (course_id, title, content) VALUES ($1, $2, $3)
        `;
        const { rows } = await client.query(query, [courseId, title, content]);

        // Return the annoucement data
        res.status(200).json({ success: true, data: rows[0] });
    } catch (error) {
        console.error("Error fetching course:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};
exports.GetAnnouncement = async (req, res) => {
    // get courseId and other needed things
    let client;
    const courseId = req.params.id;
    // Validate input
    if (!courseId || isNaN(courseId) || courseId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid course ID" });
    }

    try {
        client = await db.connect();

        // Query to post information of a announcement by courseid
        const query = `
            select * from announcements where course_id=$1        `;
        const { rows } = await client.query(query, [courseId]);
        // Check if  are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No Students found for this courseid" });
        }

        // Return the annoucement data
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error("Error fetching course:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};