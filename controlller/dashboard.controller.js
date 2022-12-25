'use strict';
var _ = require('lodash');
const dashboardController = {};
const DashboardServices = require('../service/dashboard.service');

dashboardController.getUserProductDetails = async (req, res) => {
    const userId = req.user.id;

    try {
        const response = await DashboardServices.getVegetable2(userId);
        res.send(response);
    } catch (err) {
		console.log(err);
      return 'Unhandled Exception!!';
    }
  };
  dashboardController.getProductDetails = async (req, res) => {
    const productId = req.query.productId;
    const productShopId = req.query.productShopId;

    try {
        const response = await DashboardServices.getProductDetails(productId, productShopId);
        console.log(response);
        res.send(response);
    } catch (err) {
		console.log(err);
      return 'Unhandled Exception!!';
    }
  };
  dashboardController.postProductDetails = async (req, res) => {
    const productId = req.body.product_id;
    const farmAddress = req.body.farm_address;
    const cropTime = req.body.crop_time;
    const userId = req.user.id;

    try {
        const response = await DashboardServices.UpdateVegetable(productId, userId, farmAddress, cropTime);
        res.send(response);
    } catch (err) {
		console.log(err);
      return 'Unhandled Exception!!';
    }
  };
  dashboardController.getProductList = async (req, res) => {
    const productShopId = req.query.productShopId;

    try {
      const response = await DashboardServices.getProductList(productShopId);
      console.log(response)
      res.send(response);
  } catch (err) {
  console.log(err);
    return 'Unhandled Exception!!';
  }
  };

  dashboardController.changeQrCodeLinkage = async (req, res) => {
    const productId = req.body.product_id;
    const qrId = req.body.qr_id;
    const shopId = req.user.id;

    try {
        const response = await DashboardServices.postChangeQrLinkage(productId, shopId, qrId);
        res.send(response);
    } catch (err) {
		console.log(err);
      return 'Unhandled Exception!!';
    }
  };

  dashboardController.getCreatedQrCodeLinkage = async (req, res) => {
    const shopId = req.user.id;

    try {
        const response = await DashboardServices.getCreatedQrCodeLinkage( shopId );
        console.log(response)
        res.send(response);
    } catch (err) {
		console.log(err);
      return 'Unhandled Exception!!';
    }
  };

  dashboardController.changeQrCodeImage = async (req, res) => {
    const qrImage = req.body.qr_image;
    const qrId = req.body.qr_id;
    const shopId = req.user.id;

    try {
        const response = await DashboardServices.changeQrCodeImage(qrImage, shopId, qrId);
        res.send(response);
    } catch (err) {
		console.log(err);
      res.status(401).json({ success: false, msg: 'Unhandled Exception!!' });
    }
  };

  dashboardController.getProductQrCodeList = async (req, res) => {
    const shopId = req.user.id;

    try {
      const response = await DashboardServices.getProductQrCodeList(shopId);
      res.send(response);
  } catch (err) {
  console.log(err);
    return 'Unhandled Exception!!';
  }
  };

  dashboardController.getProductQrCodeDetails = async (req, res) => {
    const productInfoId = req.query.productInfoId;

    try {
        const response = await DashboardServices.getProductQrCodeDetails(productInfoId);
        console.log(response);
        res.send(response);
    } catch (err) {
		console.log(err);
      return 'Unhandled Exception!!';
    }
  };
  module.exports = dashboardController;

      // "qr_image" : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
