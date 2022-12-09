module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("User", {
        shopName:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        shopAddress:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return User;
};