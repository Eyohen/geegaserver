const express = require("express");
const { createOrder,getOrders, deleteOrder } = require("../controllers/order.js");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware.js")
const {verifyToken} = require("../middleware/jwt.js")


const router = express.Router();




router.post('/:gigId', verifyToken, createOrder)
router.get('/', verifyToken, getOrders)
router.delete('/:id', deleteOrder)

module.exports = router;