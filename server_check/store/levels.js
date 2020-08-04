const levels = [
  {
    backgroundColor: '#fc5c65',
    icon: 'arrow-up-bold-circle-outline',
    label: 'Urgent',
    value: 1,
  },
  {
    backgroundColor: '#fd9644',
    icon: 'alert-circle',
    label: 'Medium',
    value: 2,
  },
  {
    backgroundColor: '#26de81',
    icon: 'arrow-down-circle',
    label: 'Low',
    value: 3,
  },
  {
    backgroundColor: '#51de26',
    icon: 'checkmark-circle-sharp',
    label: 'Ok',
    value: 4,
  },
];

const getLevels = () => levels;

const getLevel = (id) => levels.find((c) => c.value === id);

module.exports = {
  getLevels,
  getLevel,
};
