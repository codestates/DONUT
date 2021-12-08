'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.post, {foreignKey: 'userId', sourceKey: 'id'}); // post의 userId컬럼이 user의 id를 참조
      models.user.hasMany(models.freetalk, {foreignKey: 'userId', sourceKey: 'id'});
      models.user.hasMany(models.recentPrice, {foreignKey: 'userId', sourceKey: 'id'});
      models.user.hasMany(models.comment, {foreignKey: 'userId', sourceKey: 'id'});
      models.user.hasMany(models.like, {foreignKey: 'userId', sourceKey: 'id'});
    }
  };
  user.init({
    nickname: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    manager: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};