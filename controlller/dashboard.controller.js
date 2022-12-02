'use strict';

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
    const productName = req.body.product_name;
    const quantity = req.body.quantity;
    const farmName = req.body.farm_name;
    const farmAddress = req.body.farm_address;
    const farmContact = req.body.farm_contact;
    try {
        const response = await DashboardServices.addVegetable(productName, quantity, farmName, farmAddress, farmContact);
        res.send(response);
    } catch (err) {
		console.log(err);
      return 'Unhandled Exception!!';
    }
  };

  module.exports = dashboardController;