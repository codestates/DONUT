'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class freetalk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.freetalk.belongsTo(models.user, {foreignKey: 'userId', targetKey: 'id'});
      models.freetalk.hasMany(models.comment, {foreignKey: 'freetalkId', sourceKey: 'id'});
      models.freetalk.hasMany(models.like, {foreignKey: 'freetalkId', sourceKey: 'id'});
    }
  };
  freetalk.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    article: DataTypes.STRING,
    hashtag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'freetalk',
  });
  return freetalk;
};