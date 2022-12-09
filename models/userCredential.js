module.exports = (sequelize, DataTypes) =>{
    const UserCredential = sequelize.define("UserCredential", {
        username:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        hash:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
        salt:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
            },
        },
    });
    return UserCredential;
};