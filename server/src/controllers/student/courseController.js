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
            c.id, 
            c.title, 
            c.image_url, 
            c.level, 
            c.duration, 
            (SELECT COUNT(*) FROM enrollments WHERE course_id = c.id) AS numberofstudents,
            e.progress,
            u.name AS instructor_name, 
            u.image_url AS instructor_image_url,
            (SELECT COUNT(*) 
            FROM lessons l 
            JOIN modules m ON l.module_id = m.id 
            WHERE m.course_id = c.id) AS totallessons,
            (SELECT COUNT(*) 
            FROM lessons l
            JOIN modules m ON l.module_id = m.id
            LEFT JOIN student_lesson_progress slp ON l.id = slp.lesson_id AND slp.student_id = $1
            WHERE m.course_id = c.id AND slp.iscompleted = TRUE) AS totalcompleted,
            -- Combine AVG and COUNT for reviews in a single query
            rc.rating ,
            rc.reviews
        FROM 
            courses c
        JOIN 
            instructors i ON c.instructor_id = i.id
        JOIN 
            users u ON i.user_id = u.id
        JOIN 
            enrollments e ON c.id = e.course_id
        LEFT JOIN 
            (SELECT 
                course_id,
                AVG(review) AS rating,
                COUNT(*) AS reviews
            FROM review_course
            GROUP BY course_id) rc 
            ON c.id = rc.course_id
        WHERE 
            c.id = $2 AND e.student_id = $1;


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
exports.getCourseModLesStudent = async (req, res) => {
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
            WITH lesson_details AS (
                SELECT l.id,l.duration, l.module_id, l.title, 
                    COALESCE(slp.iscompleted, FALSE) AS isCompleted,
                    CASE
                        WHEN al.id IS NOT NULL THEN 'assignment'
                        WHEN tl.id IS NOT NULL THEN 'text'
                        WHEN vl.id IS NOT NULL THEN 'video'
                    END AS lesson_type,
                    COALESCE(al.description, tl.description, '') AS description,
                    al.instructions,
                    al.points,
                    al.due_date,
                    vl.url
                FROM lessons l
                LEFT JOIN student_lesson_progress slp ON l.id = slp.lesson_id AND slp.student_id = $1
                LEFT JOIN assignment_lessons al ON l.id = al.lesson_id
                LEFT JOIN text_lessons tl ON l.id = tl.lesson_id
                LEFT JOIN video_lessons vl ON l.id = vl.lesson_id
            ),
            module_lesson_counts AS (
                SELECT m.id, COUNT(CASE WHEN ld.isCompleted THEN 1 END) AS completed_lessons_count
                FROM modules m
                LEFT JOIN lesson_details ld ON m.id = ld.module_id
                WHERE m.course_id = $2 AND m.is_published = TRUE
                GROUP BY m.id
            )
            SELECT 
                m.id,
                m.title,
                m.description,
                mlc.completed_lessons_count,
                json_agg(
                    json_build_object(
                        'id', ld.id,
                        'title', ld.title,
                        'duration', ld.duration,
                        'isCompleted', ld.isCompleted,
                        'type', ld.lesson_type,
                        'description', ld.description,
                        'instructions', ld.instructions,
                        'points', ld.points,
                        'due_date', ld.due_date,
                        'url', ld.url
                    )
                ) AS lessons
            FROM 
                modules m
            JOIN module_lesson_counts mlc ON m.id = mlc.id
            LEFT JOIN lesson_details ld ON m.id = ld.module_id
            WHERE 
                m.course_id = $2 AND m.is_published = TRUE
            GROUP BY 
                m.id, m.title, m.description, mlc.completed_lessons_count
            ORDER BY 
                m.id

        `;
        const { rows } = await client.query(query, [studentId, courseId]);

        // Check if  are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No course found for this student" });
        }

        // Return the data
        res.status(200).json({ success: true, data: rows, });
    } catch (error) {
        console.error("Error fetching course:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};

exports.getCourseLessonStudent = async (req, res) => {
    let client;
    const lessonId = parseInt(req.params.lessonId);
    const studentId = parseInt(req.params.studentId);

    // Validate input
    if (isNaN(lessonId) || lessonId <= 0 || isNaN(studentId) || studentId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid lesson ID or student ID" });
    }

    try {
        client = await db.connect();

        // Query to get the lesson by its ID and other related details
        const query = `
        WITH lesson_base AS (
            SELECT lessons.id, lessons.module_id, modules.course_id
            FROM lessons
            JOIN modules ON lessons.module_id = modules.id
            WHERE lessons.id = $1
        ),
        ordered_lessons AS (
            SELECT 
                lessons.id AS lesson_id,
                lessons.module_id,
                modules.course_id,
                ROW_NUMBER() OVER (ORDER BY modules.id, lessons.id) AS rn
            FROM lessons
            JOIN modules ON lessons.module_id = modules.id
            WHERE modules.course_id = (SELECT course_id FROM lesson_base)
        ),
        current_lesson_row AS (
            SELECT rn FROM ordered_lessons WHERE lesson_id = $1
        ),
        current_with_neighbors AS (
            SELECT 
                curr.lesson_id AS current_lesson_id,
                prev.lesson_id AS prev_lesson_id,
                next.lesson_id AS next_lesson_id
            FROM ordered_lessons curr
            LEFT JOIN ordered_lessons prev ON prev.rn = curr.rn - 1
            LEFT JOIN ordered_lessons next ON next.rn = curr.rn + 1
            JOIN current_lesson_row ON curr.rn = current_lesson_row.rn
        ),
        module_lessons_json AS (
            SELECT 
                json_agg(
                    json_build_object(
                        'lesson_id', l.id,
                        'title', l.title,
                        'duration', m.progress, 
                        'isCompleted', COALESCE(slp.iscompleted, false)
                    ) ORDER BY l.id
                ) AS module_lessons
            FROM lessons l
            JOIN lesson_base lb ON l.module_id = lb.module_id
            LEFT JOIN student_lesson_progress slp ON slp.lesson_id = l.id AND slp.student_id = $2
            JOIN modules m ON l.module_id = m.id
        )
        SELECT
            l.id AS lesson_id,
            l.title AS lesson_title,
            m.title AS module_title,     
            m.description AS module_description, 
            c.title AS course_title,      
            cwn.prev_lesson_id,
            cwn.next_lesson_id,

            v.url AS video_url,
            t.description AS text_description,
            t.sections AS text_sections,
            a.description AS assignment_description,
            a.instructions,
            a.points,
            a.due_date,

            CASE 
                WHEN v.id IS NOT NULL THEN 'video'
                WHEN t.id IS NOT NULL THEN 'text'
                WHEN a.id IS NOT NULL THEN 'assignment'
                ELSE 'unknown'
            END AS lesson_type,

            ml.module_lessons
        FROM current_with_neighbors cwn
        JOIN lessons l ON l.id = cwn.current_lesson_id
        LEFT JOIN video_lessons v ON v.lesson_id = l.id
        LEFT JOIN text_lessons t ON t.lesson_id = l.id
        LEFT JOIN assignment_lessons a ON a.lesson_id = l.id
        JOIN module_lessons_json ml ON TRUE
        JOIN modules m ON m.id = l.module_id       
        JOIN courses c ON c.id = m.course_id;     
        `;

        // Pass both lessonId and studentId as an array
        const { rows } = await client.query(query, [lessonId, studentId]);

        // Check if lessons are found
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No lesson found for this id" });
        }

        // Return the data
        res.status(200).json({ success: true, data: rows[0] });  // returning the first result
    } catch (error) {
        console.error("Error fetching lesson:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};
