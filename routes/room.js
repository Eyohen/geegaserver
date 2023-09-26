const express = require("express");
const { createRoom, getSingleRoom,
        getAllRooms, updateRoom,
        deleteRoom, RoomAvailable
} = require("../controllers/room.js");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware.js")
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken.js");


const router = express.Router();


router.post('/rooms', verifyAdmin, createRoom)
router.get('/rooms/:id',  getSingleRoom)
router.get('/rooms', getAllRooms)
router.put('/rooms/:id',verifyAdmin, updateRoom)
router.put('/rooms/availability/:id',RoomAvailable)
router.delete('/rooms/:id/:hotelid',verifyAdmin,deleteRoom)

// router.post('/login', login)
// router.get('/logout', logout)

// router.get('/refresh', handleRefreshToken)


// router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
// router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)




module.exports = router;