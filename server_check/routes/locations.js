const express = require('express');
const router = express.Router();
const Joi = require('joi');
const multer = require('multer');

const store = require('../store/locations');
const levelsStore = require('../store/levels');
const validateWith = require('../middleware/validation');
const auth = require('../middleware/auth');
const imageResize = require('../middleware/imageResize');
const delay = require('../middleware/delay');
const locationMapper = require('../mappers/locations');
const config = require('config');

const upload = multer({
  dest: 'uploads/',
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const schema = {
  loc_name: Joi.string().required(),
  user_id: Joi.number().required().min(1),
};

router.get('/', (req, res) => {
  const locations = store.getLocations();
  const resources = locations.map(locationMapper);
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
    imageResize,
  ],

  async (req, res) => {
    const location = {
      loc_name: req.body.loc_name,
      user_id: parseInt(req.body.user_id),
    };
    if (req.body.location) location.location = JSON.parse(req.body.location);
    if (req.user) location.user_id = req.user.user_id;

    store.addLocation(location);

    res.status(201).send(location);
  }
);

module.exports = router;
