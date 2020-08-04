const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Expo } = require('expo-server-sdk');

const usersStore = require('../store/users');
const locationsStore = require('../store/locations');
const messagesStore = require('../store/messages');
const sendPushNotification = require('../utilities/pushNotifications');
const auth = require('../middleware/auth');
const validateWith = require('../middleware/validation');

const schema = {
  location_id: Joi.number().required(),
  message: Joi.string().required(),
};

router.get('/', auth, (req, res) => {
  const messages = messagesStore.getMessagesForUser(req.user.user_id);

  const mapUser = (user_id) => {
    const user = usersStore.getUserById(user_id);
    return { id: user.id, name: user.name };
  };

  const resources = messages.map((message) => ({
    id: message.id,
    location_id: message.location_id,
    dateTime: message.dateTime,
    content: message.content,
    fromUser: mapUser(message.fromUserId),
    toUser: mapUser(message.toUserId),
  }));

  res.send(resources);
});

router.post('/', [auth, validateWith(schema)], async (req, res) => {
  const { location_id, message } = req.body;

  const location = locationsStore.getLocation(location_id);
  if (!location) return res.status(400).send({ error: 'Invalid location_id.' });

  const targetUser = usersStore.getUserById(parseInt(location.user_id));
  if (!targetUser) return res.status(400).send({ error: 'Invalid user_id.' });

  messagesStore.add({
    fromUser: req.user.user_id,
    toUser: location.user_id,
    location_id,
    content: message,
  });

  const { expoPushToken } = targetUser;

  if (Expo.isExpoPushToken(expoPushToken))
    await sendPushNotification(expoPushToken, message);

  res.status(201).send();
});

module.exports = router;
