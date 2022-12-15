'use strict';
var _ = require('lodash');
const dashboardController = {};
const DashboardServices = require('../service/dashboard.service');

dashboardController.getUserProductDetails = async (req, res) => {
    const userId = req.user.id;

    try {
        const response = await DashboardServices.getUserProductDetails(userId);
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
      res.send(response);
  } catch (err) {
  console.log(err);
    return 'Unhandled Exception!!';
  }
  };

  module.exports = dashboardController;