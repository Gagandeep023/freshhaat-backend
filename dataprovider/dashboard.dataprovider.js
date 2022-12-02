'use strict';
const queryPool = require('../models/db.connection');

const symbolsDp = {

  postDetails: (productId, quantity, farmName, farmAddress, farmContact, cropTime) => {
    let sql = `INSERT INTO farm_purchase (product_id, quantity, farm_name, farm_address, farm_contact, crop_time)
      VALUES ('${productId}', '${quantity}', '${farmName}', '${farmAddress}', '${farmContact}', '${cropTime}');`;
    return queryPool(sql);
  },

  updateDetails: (productId, quantity, farmName, farmAddress, farmContact, cropTime) => {
    let sql = `UPDATE farm_purchase SET
    quantity = '${quantity}', farm_name = '${farmName}', 
    farm_address = '${farmAddress}', farm_contact = '${farmContact}', crop_time = '${cropTime}'
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
    fp.quantity,
    fp.farm_name,
    fp.farm_address,
    fp.farm_contact,
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