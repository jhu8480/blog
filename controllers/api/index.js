const path = require('path');
const router = require('express').Router();
const userRoutes = require(path.join(__dirname, 'user-routes.js'));
const blogRoutes = require(path.join(__dirname, 'blog-routes.js'));
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comments', commentRoutes);

module.exports = router;