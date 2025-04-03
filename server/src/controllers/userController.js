const db = require("../models/db"); // Import the database connection

exports.updateProfileUser = async (req, res) => {
    let client;
    const userId = req.params.id; // Getting userId from params
    const { name, phone, location, bio } = req.body; // No need for id in body

    // Validate userId from URL
    if (!userId || isNaN(userId) || userId <= 0) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    try {
        client = await db.connect();

        // Initialize the query
        let query = 'UPDATE users SET updated_at = CURRENT_TIMESTAMP';
        let values = [];
        let counter = 1; // To correctly map the $ placeholders in the query

        // Add name to query if it's provided
        if (name) {
            query += `, name = $${counter}`;
            values.push(name);
            counter++;
        }
        // Add phone to query if it's provided
        if (phone) {
            query += `, phone = $${counter}`;
            values.push(phone);
            counter++;
        }
        // Add location to query if it's provided
        if (location) {
            query += `, location = $${counter}`;
            values.push(location);
            counter++;
        }
        // Add bio to query if it's provided
        if (bio) {
            query += `, bio = $${counter}`;
            values.push(bio);
            counter++;
        }

        // Finalize the query with the WHERE condition and userId
        query += ` WHERE id = $${counter} RETURNING *`; // This returns the updated user profile
        values.push(userId);

        // Execute the query
        const { rows } = await client.query(query, values);

        // If no rows were affected (user not found), return a 404
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "No profile found for this user" });
        }

        // Return the updated user profile
        res.status(200).json({ success: true, data: rows[0] });

    } catch (error) {
        console.error("Error updating user profile:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
        if (client) client.release(); // Ensure the connection is released
    }
};
