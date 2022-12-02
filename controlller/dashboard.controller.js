'use strict';
var _ = require('lodash');
const dashboardController = {};
const DashboardServices = require('../service/dashboard.service');

dashboardController.getDetails = async (req, res) => {
    let productId = req.params.productId;
    productId = parseInt(productId);

    try {
        const response = await DashboardServices.getVegetable(productId);
        res.send(response);
    } catch (err) {
		console.log(err);
      return 'Unhandled Exception!!';
    }
  };

  dashboardController.addEntry = async (req, res) => {
    let productName = req.body.product_name;
    productName = _.startCase(_.camelCase(productName))
    const quantity = req.body.quantity;
    const farmName = req.body.farm_name;
    const farmAddress = req.body.farm_address;
    const farmContact = req.body.farm_contact;
    let cropTime = req.body.crop_time;
    cropTime = new Date(cropTime).toISOString().replace('T', ' ').substring(0, 19);

    // cropTime = Math.floor(date.getTime() / 1000);


    try {
        const response = await DashboardServices.addVegetable(productName, quantity, farmName, farmAddress, farmContact, cropTime);
        res.send(response);
    } catch (err) {
		console.log(err);
      return 'Unhandled Exception!!';
    }
  };

  module.exports = dashboardController;