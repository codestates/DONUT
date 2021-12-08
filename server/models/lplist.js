'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class lpList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.lpList.hasMany(models.recentPrice, {foreignKey: 'lpListId', sourceKey: 'id'});
      models.lpList.hasOne(models.albumtag, {foreignKey: 'lpListId', sourceKey:'id'});
      models.lpList.hasMany(models.like, {foreignKey: 'lpListId', sourceKey: 'id'});
    }
  };
  lpList.init({
    genre: DataTypes.STRING,
    artist: DataTypes.STRING,
    albumTitle: DataTypes.STRING,
    sellingPrice: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'lpList',
  });
  return lpList;
};