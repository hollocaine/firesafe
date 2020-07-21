const express = require('express');
const router = express.Router();
const Joi = require('joi');
const multer = require('multer');

const store = require('../store/questions');
const levelsStore = require('../store/levels');
const validateWith = require('../middleware/validation');
const auth = require('../middleware/auth');
const imageResize = require('../middleware/imageResize');
const delay = require('../middleware/delay');
const questionMapper = require('../mappers/questions');
const config = require('config');

const upload = multer({
  dest: 'uploads/',
  limits: { fieldSize: 25 * 1024 * 1024 },
});
const schema = {
  location_id: Joi.number().required().min(1),
  user_id: Joi.number().required().min(1),
  questions: Joi.object({
    question_id: Joi.number().required().min(1),
    question: Joi.string().required().min(1),
  }),
};

const validate_level_id = (req, res, next) => {
  if (!levelsStore.getLevel(parseInt(req.body.user_id)))
    return res.status(400).send({ error: 'Invalid level_id.' });
  next();
};

router.get('/', (req, res) => {
  const questions = store.getQuestions();
  const resources = questions.map(questionMapper);
  res.send(resources);
});

router.post(
  '/',
  [
    // Order of these middleware matters.
    // "upload" should come before other "validate" because we have to handle
    // multi-part form data. Once the upload middleware from multer applied,
    // request.body will be populated and we can validate it. This means
    // if the request is invalid, we'll end up with one or more image files
    // stored in the uploads folder. We'll need to clean up this folder
    // using a separate process.
    // auth,
    upload.array('images', config.get('maxImageCount')),
    validateWith(schema),
    validate_level_id,
    imageResize,
  ],

  async (req, res) => {
    const question = {
      loc_name: req.body.title,
      level_id: parseInt(req.body.level_id),
      description: req.body.description,
    };
    question.images = req.images.map((fileName) => ({ fileName: fileName }));
    if (req.body.question) question.question = JSON.parse(req.body.question);
    if (req.user) question.user_id = req.user.user_id;

    store.addQuestion(question);

    res.status(201).send(question);
  }
);

module.exports = router;
