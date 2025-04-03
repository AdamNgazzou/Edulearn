const express = require("express");
const { updateProfileUser } = require("../controllers/userController");

const router = express.Router();

router.put("/profile/:id", updateProfileUser);


module.exports = router;