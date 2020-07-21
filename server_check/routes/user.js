const express = require('express');
const router = express.Router();

const usersStore = require('../store/users');
const locationsStore = require('../store/locations');
const auth = require('../middleware/auth');

router.get('/:id', auth, (req, res) => {
  const user_id = parseInt(req.params.id);
  const user = usersStore.getUserById(user_id);
  if (!user) return res.status(404).send();

  const locations = locationsStore.filterLocations(
    (location) => location.user_id === user_id
  );

  res.send({
    id: user.id,
    name: user.name,
    email: user.email,
    locations: locations.length,
  });
});

module.exports = router;
