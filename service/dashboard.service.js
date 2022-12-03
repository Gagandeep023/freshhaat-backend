'use strict';

const DashboardServices = {};
const DashboardDp = require('../dataprovider/dashboard.dataprovider');

DashboardServices.getVegetable = async (productId) => {
    const response = await DashboardDp.getVegetable(productId);
    console.log(response);
    return response;
};

  DashboardServices.addVegetable = async (productName, farmAddress, cropTime) => {
    console.log(productName);
    let productId = await DashboardDp.isProductThere(productName);
    let response;
    if((productId.length === 0)){
      productId= await DashboardDp.addProduct(productName);
      productId = productId.insertId
      response = await DashboardDp.postDetails(productId, farmAddress, cropTime);

    } else{
      productId = productId[0].id
      response = await DashboardDp.updateDetails(productId, farmAddress, cropTime);
    }
    console.log(response);
    return response;
};

module.exports = DashboardServices;