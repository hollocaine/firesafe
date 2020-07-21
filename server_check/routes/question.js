const express = require('express');
const router = express.Router();

const store = require('../store/questions');
const auth = require('../middleware/auth');
const questionMapper = require('../mappers/questions');

router.get('/:id', auth, (req, res) => {
  const question = store.getQuestion(parseInt(req.params.id));
  if (!question) return res.status(404).send();
  const resource = questionMapper(question);
  res.send(resource);
});

module.exports = router;
