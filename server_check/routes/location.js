const express = require('express');
const router = express.Router();

const store = require('../store/locations');
const auth = require('../middleware/auth');
const locationMapper = require('../mappers/locations');

router.get('/:id', auth, (req, res) => {
  const location = store.getLocation(parseInt(req.params.id));
  if (!location) return res.status(404).send();
  const resource = locationMapper(location);
  res.send(resource);
});

module.exports = router;
