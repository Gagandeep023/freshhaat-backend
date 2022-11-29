module.exports = (sequelize, DataTypes) => {

    const farmPurchase = sequelize.define('farm_purchase',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        farm_name: {
            type: DataTypes.STRING
        },
        farm_address: {
            type: DataTypes.STRING
        },
        crop_time: {
            type: DataTypes.TIME
        },
        
    },
    {
        freezeTableName: true
    });
    
    return farmPurchase;
}
  