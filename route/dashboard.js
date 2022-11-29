const express = require('express');
const router = express.Router();
const dashboard = require('../controlller/dashboard.controller');


router.post("/Entry", dashboard.createEntry);

router.get("/details",dashboard.getDetails);

module.exports = router;