const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db"); // Database connection

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Store in .env

// ✅ Registration Route (with transaction & improved security)
app.post("/register", async (req, res) => {
    const {
        name, email, password, role, phone, location, bio,
        program, interests, achievements, department, expertise, education
    } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Name, email, password, and role are required" });
    }

    try {
        const client = await db.connect(); // Start transaction
        await client.query("BEGIN");

        // Hash password securely
        const saltRounds = 10;
        const password_hash = await bcrypt.hash(password, saltRounds);

        // Insert user
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

            // Insert achievements if provided
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

            // Insert education if provided
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

        await client.query("COMMIT"); // Commit transaction
        client.release();
        res.status(201).json({ message: "User registered successfully", userId });

    } catch (error) {
        console.error(error);
        if (error.code === "23505") {
            return res.status(400).json({ error: "Email already exists" });
        }
        res.status(500).json({ error: "Failed to register user" });
    }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Find user by email
        const userQuery = "SELECT * FROM users WHERE email = $1";
        const userResult = await db.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const user = userResult.rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            SECRET_KEY,
            { expiresIn: "7d" } // Token valid for 7 days
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
});

// ✅ middleware to authenticate requests
const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];  // Extract token from header

    if (!token) {
        return res.status(403).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);  // Verify token
        req.user = decoded;  // Attach user info to request (so next function can use it)
        next();  // Pass control to the next function (the actual route)
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};
//middleware authentication instructor routes
const authenticateInstructor = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        // Decode token
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request

        // Check role in the database
        const userResult = await db.query("SELECT role FROM users WHERE id = $1", [req.user.userId]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        // Ensure the user is an instructor
        if (userResult.rows[0].role !== "instructor") {
            return res.status(403).json({ error: "Access forbidden. Only instructors are allowed." });
        }

        next(); // Proceed to the next middleware/route
    } catch (error) {
        return res.status(400).json({ error: "Invalid token." });
    }
};
//protected route
app.get("/teacher", authenticateInstructor, async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM instructors WHERE user_id = $1", [req.user.userId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Instructor profile not found." });
        }

        res.json(result.rows[0]); // Return instructor profile
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

// Example route to query database version
app.get('/db-version', async (req, res) => {
    try {
        const result = await db.query('SELECT version()'); // Use the db to run queries
        res.json({ version: result.rows[0].version }); // Send the result
        console.log(result.rows[0]); // Log it to the console
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed' });
    }
});

app.listen(3001, () => console.log("Server is Running on port 3001"));
