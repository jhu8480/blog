const router = require('express').Router();

router.get('/', (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      username: req.session.username
    });
  } catch(e) {
    res.status(500).json(e);
  }
});

router.get('/signup', (req, res) => {
  try {
    res.render('signup');
  } catch(e) {
    res.status(500).json(e);
  }
});

module.exports = router;