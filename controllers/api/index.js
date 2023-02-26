const path = require('path');
const router = require('express').Router();
const userRoutes = require(path.join(__dirname, 'user-routes.js'));
const blogRoutes = require(path.join(__dirname, 'blog-routes.js'));


router.use('/users', userRoutes);
router.use('/blog', blogRoutes);

module.exports = router;