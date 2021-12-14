'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recentPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.recentPrice.belongsTo(models.lpList, {foreignKey: 'lpListId', targetKey: 'id'});
      models.recentPrice.belongsTo(models.user, {foreignKey: 'userId', targetKey: 'id'});
    }
  };
  recentPrice.init({
    userId: DataTypes.INTEGER,
    lpListId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    date: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recentPrice',
  });
  return recentPrice;
};