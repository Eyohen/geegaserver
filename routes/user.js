const express = require("express");
const { getAllUsers,
     getSingleUser, deleteUser,
      updateUser, blockUser, 
      unblockUser, handleRefreshToken,
      logout, updatePassword,
      forgotPasswordToken, resetPassword, 
     } = require("../controllers/user.js");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware.js");
const { verifyUser, verifyAdmin } = require("../utils/verifyToken.js");
const {verifyToken} = require("../middleware/jwt.js")


const router = express.Router();



// router.post('/forgotpassword', forgotPasswordToken)
// router.put('/reset-password/:token', resetPassword)
// router.put('/updatepassword', authMiddleware, updatePassword)
// router.get('/logout', logout)
// router.get('/user/checkauthentication', verifyToken, (req,res,next)=>{
//      res.send("hello you're logged in!!!")
// })


// router.get('/user/checkuser/:id', verifyUser, (req,res,next)=>{
//      res.send("hello you're logged in and you can delete your account")
// })

// router.get('/user/checkadmin/:id', verifyAdmin, (req,res,next)=>{
//      res.send("hello admin, you're logged in and you can delete your account")
// })


router.get('/',  getAllUsers)
// router.get('/refresh', handleRefreshToken)
router.get('/:id', getSingleUser)
router.delete('/users/:id', verifyToken, deleteUser)
router.put('/users/update/:id',  verifyUser, updateUser)
// router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
// router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)




module.exports = router;