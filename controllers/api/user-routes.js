const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('user api routes')
});

module.exports = router;