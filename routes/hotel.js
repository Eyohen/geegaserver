const express = require("express");
const { createHotel, getSingleHotel,
        getAllHotels, updateHotel,
        deleteHotel,countByCity,countByType,
        getHotelRooms
} = require("../controllers/hotel.js");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware.js")
const {createError} = require("../utils/error.js")
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken.js");

const router = express.Router();


router.post('/hotels', verifyAdmin, createHotel)
router.get('/hotels/find/:id', getSingleHotel)
router.get('/hotels', getAllHotels)
router.put('/hotels/update/:id', verifyAdmin,updateHotel)
router.delete('/hotels/delete/:id', verifyAdmin, deleteHotel)
router.get('/hotels/countByCity', countByCity)
router.get('/hotels/countByType', countByType)
router.get('/hotels/room/:id', getHotelRooms)
// router.post('/login', login)
// router.get('/logout', logout)

// router.get('/refresh', handleRefreshToken)


// router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
// router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)




module.exports = router;