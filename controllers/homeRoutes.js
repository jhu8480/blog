const router = require('express').Router();
const auth = require('./../utils/auth');
const { User, Blog, Comment} = require('./../models/index');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'email']
        }
      ]
    });
    const blogArray = blogData.map(blog => blog.get({plain: true}));

    res.render('homepage', {
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      username: req.session.username,
      blogArray: blogArray.reverse()
    });
  } catch(e) {
    res.status(500).json(e);
  }
});

router.get('/blog/:id', auth, async (req, res) => {
  try {
    const response = await Blog.findByPk(req.params.id, {
      include: [{model: User, attributes: ['id', 'username', 'email']}]
    });
    const blog = response.get({plain: true});
    res.render('article', {
    loggedIn: req.session.loggedIn,
    userId: req.session.userId,
    username: req.session.username,
    blog
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