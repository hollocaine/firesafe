const express = require('express');
const router = express.Router();
const levelsStore = require('../store/levels');

router.get('/', (req, res) => {
  const levels = levelsStore.getLevels();
  res.send(levels);
});

module.exports = router;
