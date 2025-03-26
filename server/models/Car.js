module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define("Car", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Car.associate = (models) => {
      // Car belongs to a Manufacturer
        Car.belongsTo(models.Manufacturer, {
            foreignKey: "manufacturer_id", // 外部キーの名前
            as: "manufacturer", // メーカーを取得する際に使うエイリアス名
        });
    };

    return Car;
};