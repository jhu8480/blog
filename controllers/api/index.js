const path = require('path');
const router = require('express').Router();
const userRoutes = require(path.join(__dirname, 'user-routes.js'));

router.use('/users', userRoutes);


module.exports = router;