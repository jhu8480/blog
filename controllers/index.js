const path = require('path');
const router = require('express').Router();
const apiRoutes = require(path.join(__dirname, 'api', 'index.js'));

router.get('/', (req, res) => {
  res.send('Hello world');
});

router.use('/api', apiRoutes);

module.exports = router;