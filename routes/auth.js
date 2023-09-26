const express = require("express");
const { register,login,logout } = require("../controllers/auth.js");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware.js")



const router = express.Router();




router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router;