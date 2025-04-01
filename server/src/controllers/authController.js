const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/db"); // Import the database connection

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Registration logic
exports.register = async (req, res) => {
    const {
        name, email, password, role, phone, location, bio,
        program, interests, achievements, department, expertise, education
    } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Name, email, password, and role are required" });
    }

    try {

        const client = await db.connect();
        await client.query("BEGIN");
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        const userQuery = `
            INSERT INTO users (name, email, password_hash, role, phone, location, bio)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id;
        `;
        const userValues = [name, email, password_hash, role, phone || null, location || null, bio || null];
        const userResult = await client.query(userQuery, userValues);
        const userId = userResult.rows[0].id;

        if (role === "student") {
            const studentQuery = `
                INSERT INTO students (user_id, program, interests)
                VALUES ($1, $2, $3)
                RETURNING id;
            `;
            const studentValues = [userId, program || null, interests || null];
            const studentResult = await client.query(studentQuery, studentValues);
            const studentId = studentResult.rows[0].id;

            if (achievements && achievements.length > 0) {
                for (const { title, date, description } of achievements) {
                    if (title && date) {
                        await client.query(
                            `INSERT INTO achievements (student_id, title, date, description) VALUES ($1, $2, $3, $4);`,
                            [studentId, title, date, description || null]
                        );
                    }
                }
            }
        } else if (role === "instructor") {
            const instructorQuery = `
                INSERT INTO instructors (user_id, department, expertise)
                VALUES ($1, $2, $3)
                RETURNING id;
            `;
            const instructorValues = [userId, department || null, expertise || null];
            const instructorResult = await client.query(instructorQuery, instructorValues);
            const instructorId = instructorResult.rows[0].id;

            if (education && education.length > 0) {
                for (const { degree, institution, year } of education) {
                    if (degree && institution && year) {
                        await client.query(
                            `INSERT INTO education (instructor_id, degree, institution, year) VALUES ($1, $2, $3, $4);`,
                            [instructorId, degree, institution, year]
                        );
                    }
                }
            }
        } else if (role === "admin") {
            await client.query(`INSERT INTO admins (user_id) VALUES ($1);`, [userId]);
        }

        await client.query("COMMIT");
        client.release();

        res.status(201).json({ message: "User registered successfully", userId });
    } catch (error) {
        console.error(error);
        if (error.code === "23505") {
            return res.status(400).json({ error: "Email already exists" });
        }
        res.status(500).json({ error: "Failed to register user" });
    }
};

// Login logic
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const userQuery = `
        SELECT COALESCE(s.id, i.id, a.id) AS id, u.name,u.email,u.role,u.password_hash
        FROM users u
        LEFT JOIN students s ON u.id = s.user_id
        LEFT JOIN instructors i ON u.id = i.user_id
        LEFT JOIN admins a ON u.id = a.user_id
        WHERE u.email = $1;
        `;
        const userResult = await db.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            SECRET_KEY,
            { expiresIn: "7d" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role

            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
};