const messages = [
  {
    fromUserId: 2,
    toUserId: 1,
    locationId: 1,
    content: 'Is this still available?',
    id: 1,
    dateTime: 1586044521956,
  },
  {
    fromUserId: 2,
    toUserId: 1,
    locationId: 1,
    content: "I'm interested in this item. Do you provide free delivery?",
    id: 2,
    dateTime: 1586044521956,
  },
  {
    fromUserId: 2,
    toUserId: 1,
    locationId: 1,
    content: "Please give me a call and we'll arrange this for you.",
    id: 3,
    dateTime: 1586044521956,
  },
];

const getMessagesForUser = (toUserID) =>
  messages.filter((message) => message.toUserID === toUserID);

const add = (message) => {
  message.id = messages.length + 1;
  message.dateTime = Date.now();
  messages.push(message);
};

module.exports = { add, getMessagesForUser };
