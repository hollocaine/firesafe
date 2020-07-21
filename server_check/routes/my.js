const express = require('express');
const router = express.Router();

const locationsStore = require('../store/locations');
const auth = require('../middleware/auth');
const locationMapper = require('../mappers/locations');

router.get('/locations', auth, (req, res) => {
  const locations = locationsStore.filterLocations(
    (location) => location.user_id === req.user.user_id
  );
  const resources = locations.map(locationMapper);
  res.send(resources);
});

module.exports = router;
