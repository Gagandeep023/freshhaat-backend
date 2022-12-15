module.exports = (sequelize, DataTypes) =>{
    const FarmPurchase = sequelize.define("FarmPurchase", {
        product_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        farm_address:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        crop_time:{
            type:DataTypes.DATE,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
    });
    return FarmPurchase;
};