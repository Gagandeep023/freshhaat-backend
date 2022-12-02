'use strict';

const DashboardServices = {};
const DashboardDp = require('../dataprovider/dashboard.dataprovider');

DashboardServices.getVegetable = async (productId) => {
    const response = await DashboardDp.getVegetable(productId);
    console.log(response);
    return response;
};

  DashboardServices.addVegetable = async (productName, quantity, farmName, farmAddress, farmContact) => {
    let productId = await DashboardDp.isProductThere(productName);
    let response;
    if((productId.length === 0)){
      productId= await DashboardDp.addProduct(productName);
      productId = productId.insertId
      response = await DashboardDp.postDetails(productId, quantity, farmName, farmAddress, farmContact);

    } else{
      productId = productId[0].id
      response = await DashboardDp.updateDetails(productId, quantity, farmName, farmAddress, farmContact);
    }
    console.log(response);
    return response;
};

module.exports = DashboardServices;