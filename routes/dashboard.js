const express = require('express');
const router = express.Router();
const dashboard = require('../controlller/dashboard.controller');
const CHECK_FOR_AUTHENTICATION = require('../lib/authentication');


router.get("/product-details",
    dashboard.getProductDetails);

router.post("/details", CHECK_FOR_AUTHENTICATION,
    dashboard.postProductDetails);

router.get("/details", CHECK_FOR_AUTHENTICATION,
    dashboard.getUserProductDetails);
    
router.get("/product-list", CHECK_FOR_AUTHENTICATION,
    dashboard.getProductList);   
    


module.exports = router;