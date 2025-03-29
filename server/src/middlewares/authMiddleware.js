const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

exports.authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid or expired token." });
    }
};

/*//middleware authentication instructor routes
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
};*/