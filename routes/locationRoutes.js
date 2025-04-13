const express = require('express');
const router = express.Router();

router.post('/save-location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log("Received Location:", latitude, longitude);

  // You can store this in MongoDB if needed
  res.status(200).json({ message: 'Location saved successfully' });
});

module.exports = router;
