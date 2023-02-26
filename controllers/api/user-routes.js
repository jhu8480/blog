const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');

router.post('/', async (req, res) => {
  try {
    const newUser = Object.assign({}, req.body);
    newUser.password = await bcrypt.hash(req.body.password, 10);
    const response = await User.create(newUser);
    res.status(200).json({
      status: 'success',
      data: response
    });
  } catch(e) {
    res.status(400).json(e);
  }
});

module.exports = router;