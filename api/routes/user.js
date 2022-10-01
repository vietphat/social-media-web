const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Đây là users route');
});

module.exports = router;
