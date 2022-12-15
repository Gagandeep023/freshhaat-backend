module.exports = (sequelize, DataTypes) =>{
    const ProductDetail = sequelize.define("ProductDetail", {
        product_name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        product_image:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
    });
    return ProductDetail;
};