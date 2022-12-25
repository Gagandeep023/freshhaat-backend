'use strict';

const DashboardServices = {};
const DashboardDp = require('../dataprovider/dashboard.dataprovider');
const { ProductDetail } = require("../models");
const { FarmPurchase } = require("../models");
const { QrLinkage } = require("../models");

DashboardServices.getVegetable2 = async (userId) => {
    const response = await DashboardDp.getVegetable2(userId);
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
          response.product_name = productDetail.product_name;
        })

      } else {
        return "Product not found";
         
      }
    });
    const productDetails = {};
    productDetails.productDetails =  response ;
  return productDetails;
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

DashboardServices.postChangeQrLinkage = async (productId, shopId, qrId) => {
  let response;
    try {
      await QrLinkage.update(
        { 
          shop_id: shopId,
          product_id: productId,
        },
        { 
         where:{ id: qrId } 
        })
        .then((updatedRecord) => {
            response = { success: true, msg: `updated record ${updatedRecord}`};
        })
      
    } catch (err) {
      console.log(err);
      return 'Unhandled Exception!!';    
  
  }
  return response;

};

DashboardServices.changeQrCodeImage = async (qrImage, shopId, qrId) => {
  let response;
    try {
      await QrLinkage.update(
        { 
          qr_image: qrImage
        },
        { 
         where:{ shop_id: shopId, id: qrId } 
        })
        .then((updatedRecord) => {
            response = { success: true, msg: `updated record ${updatedRecord}`};
        })
      
    } catch (err) {
      console.log(err);
      return  response.status(401).json({ success: false, msg: 'Unhandled Exception!!' });
      ;    
  
  }
  return response;

};


DashboardServices.getCreatedQrCodeLinkage = async ( shopId ) => {
  let response;
  const qrName = `dummy-QR-name-${Math.floor(Math.random() * 10)}`
  const newQrLinkage = new QrLinkage({
    shop_id: shopId,
    qr_name: qrName,
  });

  try {

    await newQrLinkage.save()
          .then(async () => {
            await QrLinkage.findOne({where:{ shop_id: shopId, qr_name: qrName }})
            .then(async (QrLinkageData) => {
              await QrLinkage.update(
                { 
                  qr_name: `shopId-${QrLinkageData.shop_id}-qrCode-${QrLinkageData.id}`,
                },
                { 
                 where:{ shop_id: shopId,
                  qr_name: qrName } 
                })
                .then(() => {
                    response = { success: true, qrLinkageId: QrLinkageData.id};
                })
            })
          });

  } catch (err) {
    console.log(err);
    return 'Unhandled Exception!!';    
  }   
  return response;

};

DashboardServices.getProductQrCodeList = async(shopId) => {
  let response;
  await QrLinkage.findAll({where: { shop_id: shopId }}) 
    .then(async (QrCodeLinkage) => {
      if(QrCodeLinkage) {
        const qrCodeList = []
        await Promise.all (QrCodeLinkage.map((QrCodeData) => {

          const data = {
            qr_id: QrCodeData.id,
            qr_name: QrCodeData.qr_name
          }
          qrCodeList.push(data);
        }));
        response = { success: true,  qrCodeList: qrCodeList};
      } else {
        response = { success: false, qrCodeList: "Product list not found"};
      }
    });
    return response;
};

DashboardServices.getProductQrCodeDetails = async (productInfoId) => {
  let response;
   await QrLinkage.findOne({where:{ id: productInfoId }})
    .then(async (QrLink) => {
      if(QrLink) {
        response = await DashboardServices.getProductDetails(QrLink.product_id, QrLink.shop_id);
      } else {
        return "Product not found";
      }
    });
  return response;
};
module.exports = DashboardServices;