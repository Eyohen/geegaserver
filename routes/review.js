const express = require("express");
const {createReviews,getReviews, deleteReviews } = require("../controllers/review.js");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware.js");

const {verifyToken} = require("../middleware/jwt.js")



const router = express.Router();




router.post('/', verifyToken, createReviews)
router.get('/:gigId', getReviews)
router.delete('/:id', deleteReviews)

module.exports = router;