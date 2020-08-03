const reports = [
  {
    id: 201,
    title: 'Blocked Escape',
    description: 'Fire escape is blocked',
    images: [{ fileName: 'jacket1' }],
    location_id: 1,
    level: 1,
    user_id: 1,
    question_id: 2,
    date: '2020-05-01',
  },
  {
    id: 3,
    title: 'Burst fire hose',
    description:
      "Bri Griffin: You know, Lois, I'm really not comfortable talking about this amelodically. Meg Griffin: Mom, there's no way I'm sleeping in Chris's room this weekend.It smells like old milk in there!  Chris Griffin: Hey, if I could find it, I'd clean it up.",
    images: [{ fileName: 'couch2' }],
    level: 2,
    location_id: 1,
    user_id: 2,
    question_id: 2,
    date: '2020-05-01',
  },
  {
    id: 1,
    title: 'Missing fire hydrant',
    description: 'Normally 2 fire hydrants in this room',
    images: [
      { fileName: 'couch1' },
      { fileName: 'couch2' },
      { fileName: 'couch3' },
    ],
    location_id: 1000,
    level: 1,
    user_id: 1,
    question_id: 1,
    date: '2020-05-01',
  },
  {
    id: 2,
    title: 'Alarm faulty',
    description: 'Alarm box broken',
    images: [{ fileName: 'shoes1' }],
    level: 1,
    location_id: 1,
    user_id: 2,
    question_id: 1,
    date: '2020-05-01',
  },
  {
    id: 102,
    title: 'Blocked entrances',
    description: 'Boxes in front of entrance',
    images: [{ fileName: 'camera1' }],
    location_id: 1,
    level: 3,
    user_id: 1,
    question_id: 2,
    date: '2020-05-01',
  },
];

const addReport = (report) => {
  report.id = reports.length + 1;
  reports.push(report);
};

const getReports = () => reports;

const getReport = (id) => reports.find((report) => report.id === id);

const filterReports = (predicate) => reports.filter(predicate);

module.exports = {
  addReport,
  getReports,
  getReport,
  filterReports,
};
