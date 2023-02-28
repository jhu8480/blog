const router = require('express').Router();
const {User, Blog, Comment} = require('../../models/index');

router.get('/article/:id', async (req, res) => {
  try {
    const response = await Blog.findByPk(req.params.id);
    res.status(200).json(response);
  } catch(e) {
    res.status(500).json(e);
  }
});

router.get('/:userid', async (req, res) => {
  try {
    const response = await Blog.findAll({
      where: {user_id: req.params.userid},
      include: [{model: User}]
    });
    res.status(200).json(response);
  } catch(e) {
    res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const newBlog = Object.assign({}, req.body);
    const response = await Blog.create(newBlog);
    res.status(200).json({
      status: 'success',
      data: response
    });
  } catch(e) {
    res.status(400).json(e);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const response = await Blog.update(req.body, {where: {id: req.params.id}});
    res.status(200).json({
      status: 'success',
      updated: response
    });
  } catch(e) {
    res.status(500).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with that id!' });
      return;
    };

    res.status(200).json({
      status: 'success'
    });
  } catch(e) {
    res.status(500).json(err);
  }
});


module.exports = router;