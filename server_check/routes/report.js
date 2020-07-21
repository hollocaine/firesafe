const express = require('express');
const router = express.Router();

const store = require('../store/reports');
const auth = require('../middleware/auth');
const reportMapper = require('../mappers/reports');

router.get('/:id', auth, (req, res) => {
  const report = store.getReport(parseInt(req.params.id));
  if (!report) return res.status(404).send();
  const resource = reportMapper(report);
  res.send(resource);
});

module.exports = router;
