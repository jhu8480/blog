const router = require('express').Router();
const {User, Blog, Comment} = require('../../models/index');

router.get('/:id', async (req, res) => {
  try {
    const response = await Comment.findAll({
      where: {blog_id: req.params.id},
      include: [{model: Blog}, {model: User}]
    });
    res.status(200).json(response);

  } catch(e) {
    res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const newComment = Object.assign({}, req.body);
    const response = await Comment.create(newComment);
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
    const response = await Comment.update(req.body, {where: {id: req.params.id}});
    res.status(200).json({
      status: 'success',
      updated: response
    });
  } catch(e) {
    res.status(500).json(e);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const response = await Comment.update(req.body, {where: {id: req.params.id}});
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
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with that id!' });
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