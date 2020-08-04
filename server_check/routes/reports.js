const express = require('express');
const router = express.Router();
const Joi = require('joi');
const multer = require('multer');

const store = require('../store/reports');
const levelsStore = require('../store/levels');
const validateWith = require('../middleware/validation');
const auth = require('../middleware/auth');
const imageResize = require('../middleware/imageResize');
const delay = require('../middleware/delay');
const reportMapper = require('../mappers/reports');
const config = require('config');

const upload = multer({
  dest: 'uploads/',
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const schema = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  user_id: Joi.number().required().min(1),
  question_id: Joi.number().required().min(1),
  location_id: Joi.number().required().min(1),
  level_id: Joi.number().required().min(1),
  date: Joi.string().required().min(10).max(10),
};

const validate_level_id = (req, res, next) => {
  if (!levelsStore.getLevel(parseInt(req.body.level_id)))
    return res.status(400).send({ error: 'Invalid level_id.' });
  next();
};

router.get('/', (req, res) => {
  const reports = store.getReports();
  const resources = reports.map(reportMapper);
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
    console.log(req + 'here');
    const report = {
      title: req.body.title,
      location_id: parseInt(req.body.location_id),
      question_id: parseInt(req.body.question_id),
      level_id: parseInt(req.body.level_id),
      date: req.body.date,
      description: req.body.description,
    };
    report.images = req.images.map((fileName) => ({ fileName: fileName }));

    if (req.user) report.user_id = req.user.user_id;

    store.addReport(report);

    res.status(201).send(report);
  }
);

module.exports = router;
