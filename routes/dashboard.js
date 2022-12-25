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
    
    router.post("/change-qr-code-linkage", CHECK_FOR_AUTHENTICATION,
        dashboard.changeQrCodeLinkage);  

    router.get("/create-qr-code-linkage", CHECK_FOR_AUTHENTICATION,
        dashboard.getCreatedQrCodeLinkage); 

    router.post("/change-qr-code-image", CHECK_FOR_AUTHENTICATION,
        dashboard.changeQrCodeImage); 

    router.get("/product-qr-code-list", CHECK_FOR_AUTHENTICATION,
        dashboard.getProductQrCodeList); 

    router.get("/product-qr-code-details",
        dashboard.getProductQrCodeDetails);


module.exports = router;