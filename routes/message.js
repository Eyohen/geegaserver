const express = require("express");
const { createMessage, getMessages } = require("../controllers/message.js");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware.js");
const {verifyToken} = require("../middleware/jwt.js")



const router = express.Router();




router.post('/', verifyToken, createMessage)
router.get('/:id',verifyToken, getMessages)

// router.put('/:id',verifyToken, updateMessage)
// router.post('/logout', deleteMessage)

module.exports = router;