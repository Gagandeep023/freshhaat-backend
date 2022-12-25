module.exports = (sequelize, DataTypes) =>{
    const QrLinkage = sequelize.define("QrLinkage", {
        qr_name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        qr_image:{
            type:DataTypes.STRING,
            allowNull: true,
            validate:{
                notEmpty: true,
            },
        },
        product_id:{
            type:DataTypes.INTEGER,
            allowNull: true,
            validate:{
                notEmpty: true,
            },
        },
        shop_id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
    });
    return QrLinkage;
};