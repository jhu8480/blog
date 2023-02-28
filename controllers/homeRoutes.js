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
      ],
      order: [['updatedAt', 'ASC']]
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

router.get('/managecontent/:userid', auth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {user_id: req.params.userid},
      include: [{model: User}]
    });
    const blogArray = blogData.map(data => data.get({plain: true})).reverse();
    
    const userData = await User.findByPk(req.params.userid);
    const userInfo = userData.get({plain: true});

    const commentData = await Comment.findAll({where: {user_id: req.params.userid}, include: [{model: Blog}]});
    const commentArray = commentData.map(c => c.get({plain: true}));

    res.render('manage-content', {
      loggedIn: req.session.loggedIn,
      userId: req.session.userId,
      username: req.session.username,
      blogArray,
      userInfo,
      commentArray
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