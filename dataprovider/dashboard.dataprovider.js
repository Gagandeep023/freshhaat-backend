'use strict';
const queryPool = require('../directModels/db.connection');

const symbolsDp = {

  postDetails: (productId, quantity, farmName, farmAddress, farmContact, cropTime) => {
    let sql = `INSERT INTO farm_purchase (product_id, farm_address, crop_time)
      VALUES ('${productId}', '${quantity}', '${farmName}', '${farmAddress}', '${farmContact}', '${cropTime}');`;
    return queryPool(sql);
  },

  updateDetails: (productId, quantity, farmName, farmAddress, farmContact, cropTime) => {
    let sql = `UPDATE farm_purchase SET 
    farm_address = '${farmAddress}', crop_time = '${cropTime}'
    WHERE product_id = '${productId}';`
    return queryPool(sql);
  },

  isProductThere: (productName) => {
    let sql = `select id from product_details where product_name = '${productName}'`;
    return queryPool(sql);
  },
  addProduct: (productName) => {
    let sql = `INSERT INTO product_details (product_name) VALUES ( '${productName}')`;
    return queryPool(sql);
  },

  getVegetable: (productId) => {
    let sql = `select
    fp.product_id,
    pd.product_name,
    pd.product_image,
    fp.farm_address,
    fp.crop_time
  from
    farm_purchase fp
    join product_details pd on fp.product_id = pd.id`;

    if (!isNaN(productId)) {
      sql = sql + ` WHERE fp.product_id = '${productId}'`
    }
    return queryPool(sql);
  },
};

module.exports = symbolsDp;