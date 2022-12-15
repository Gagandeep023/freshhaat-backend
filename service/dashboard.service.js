'use strict';

const DashboardServices = {};
const DashboardDp = require('../dataprovider/dashboard.dataprovider');
const { ProductDetail } = require("../models");
const { FarmPurchase } = require("../models");

DashboardServices.getVegetable2 = async (userId) => {
    const response = await DashboardDp.getVegetable(userId);
    return response;
};
DashboardServices.getUserProductDetails = async ( userId) => {
  let response;
    await FarmPurchase.findAll({where:{ user_id: userId }})
    .then((farmDetail) => {
      if(farmDetail) {
        response = farmDetail ;
      } else {
        response ={ message: "Product not found"};
      }
    });
  
  return response;
};

DashboardServices.getProductDetails = async (productId, userId) => {
  let response;
   await FarmPurchase.findOne({where:{ product_id: productId, user_id: userId }})
    .then(async (farmDetail) => {
      if(farmDetail) {
        response = farmDetail.dataValues;
        
        await ProductDetail.findOne({where:{ id: productId }})
        .then((productDetail) => {
          response.product_image = productDetail.product_image;
        })

      } else {
        return "Product not found";
         
      }
    });
  
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

    return response;
};

DashboardServices.UpdateVegetable = async (productId, userId, farmAddress, cropTime) => {
  let response;
  await FarmPurchase.findOne({where:{ product_id: productId, user_id: userId }})
  .then(async (farmDetail) => {
    if(farmDetail){
      try {
        await FarmPurchase.update(
          { 
            user_id: userId,
            farm_address: farmAddress,
            crop_time: cropTime 
          },
          { 
            where: { product_id: productId, user_id: userId } 
          })
          .then(async ( updatedRecord ) => {
            await FarmPurchase.findOne({where:{ product_id: productId, user_id: userId }})
            .then((updatedRow) => {
              response = { success: true, msg: `updated record ${updatedRecord}`, updatedRow: updatedRow.dataValues };
              return response;

            })
          });
        
      } catch (err) {
        console.log(err);
        return 'Unhandled Exception!!';    
    
    }

    } else {
      const newFarmDetail = new FarmPurchase({
        product_id: productId,
        user_id: userId,
        farm_address: farmAddress,
        crop_time: cropTime,
    });

    try {
    
      newFarmDetail.save()
            .then((newFarmDetail) => {
              if(newFarmDetail)
                response = { success: true, newFarmDetail};
            });

    } catch (err) {
      console.log(err);
      return 'Unhandled Exception!!';    
    }
    }
  })
  .catch((err) => {
    console.log(err);
    return 'Unhandled Exception!!';    
  });
  return response;
};

DashboardServices.getProductList = async(productShopId) => {
  let response;
  await ProductDetail.findAll()
    .then(async (productDetails) => {
      if(productDetails) {
        const productList = []
        await Promise.all (productDetails.map((product) => {

          const data = {
            product_id: product.id,
            product_name: product.product_name
          }
          productList.push(data);
        }));
        response = { success: true,  productList};
      } else {
        response = { success: false, productList: "Product list not found"};
      }
    });
    return response;
};
module.exports = DashboardServices;