const express = require("express");
const { createConvo, getConvos, getSingleConvo, updateConvo } = require("../controllers/conversation.js");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware.js");
const {verifyToken} = require("../middleware/jwt.js")



const router = express.Router();




router.post('/', verifyToken, createConvo)
router.get('/',verifyToken, getConvos)
router.get('/single/:id',verifyToken, getSingleConvo)
router.put('/:id',verifyToken, updateConvo)


module.exports = router;