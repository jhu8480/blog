const path = require('path');
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require(path.join(__dirname, 'api', 'index.js'));


router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;