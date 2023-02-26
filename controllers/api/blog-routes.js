const router = require('express').Router();
const {User, Blog, Comment} = require('../../models/index');

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


module.exports = router;