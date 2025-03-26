module.exports = (sequelize, DataTypes) => {
    const Manufacturer = sequelize.define("Manufacturer", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    
    Manufacturer.associate = (models) => {
        // Manufacturer has many Cars
        Manufacturer.hasMany(models.Car, {
            foreignKey: "manufacturer_id", // 外部キーの名前
            as: "cars", // 車種を取得する際に使うエイリアス名
        });
    };
    return Manufacturer;
};
