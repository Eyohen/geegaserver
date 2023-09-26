const express = require("express");
const { createGig, deleteGig,getAGig,getGigs,updateGig} = require("../controllers/gig.js");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware.js")
const {verifyToken} = require("../middleware/jwt.js")



const router = express.Router();




router.post('/', verifyToken, createGig)
router.delete('/:id', verifyToken, deleteGig)
router.get('/single/:id', getAGig)
router.get('/', getGigs)
router.put('/update/:id', updateGig)

module.exports = router;