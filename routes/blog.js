const express = require("express");
const { createBlog, updateBlog, getSingleBlog,
    getAllBlogs, deleteBlog, likeBlog, dislikeBlog
} = require("../controllers/blog.js");
const {authMiddleware, isAdmin} = require("../middleware/authMiddleware.js")


const router = express.Router();


router.post('/blog/create', createBlog)
router.get('/blog/singleblog/:id', getSingleBlog)
router.get('/blog', getAllBlogs)
router.put('/blog/likes', likeBlog)
router.put('/blog/dislikes', authMiddleware, isAdmin, dislikeBlog)
router.put('/blog/update/:id',authMiddleware, isAdmin, updateBlog)
router.delete('/blog/delete/:id',authMiddleware,  isAdmin, deleteBlog)


// router.post('/login', login)
// router.get('/logout', logout)

// router.get('/refresh', handleRefreshToken)


// router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser)




module.exports = router;