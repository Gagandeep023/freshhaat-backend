const express = require('express');
const router = express.Router();
const dashboard = require('../controlller/dashboard.controller');


router.post("/details", 
    dashboard.addEntry);

router.get("/details", 
    dashboard.getDetails);
    
router.get("/details/:productId",
    dashboard.getDetails);


module.exports = router;