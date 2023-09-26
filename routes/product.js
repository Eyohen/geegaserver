const express = require("express");
const { createProduct, getSingleProduct,
        getAllProducts, updateProduct,
        deleteProduct
} = require("../controllers/product.js");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware.js")


const router = express.Router();


router.post('/product/create',authMiddleware,  isAdmin, createProduct)
router.get('/product/:id', getSingleProduct)
router.get('/product', getAllProducts)
router.put('/product/:id',authMiddleware,  isAdmin, updateProduct)
router.delete('/product/:id',authMiddleware,  isAdmin, deleteProduct)
// router.post('/login', login)
// router.get('/logout', logout)

// router.get('/refresh', handleRefreshToken)


// router.put('/block-user/:id', authMiddleware, isAdmin, blockUser)
// router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)




module.exports = router;