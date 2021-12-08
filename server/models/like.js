'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.like.belongsTo(models.user, {foreignKey: 'userId', targetKey: 'id'});
      models.like.belongsTo(models.post, {foreignKey: 'postId', targetKey: 'id'});
      models.like.belongsTo(models.freetalk, {foreignKey: 'freetalkId', targetKey: 'id'});
      models.like.belongsTo(models.lpList, {foreignKey: 'lpListId', targetKey: 'id'});
    }
  };
  like.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    freetalkId: DataTypes.INTEGER,
    lpListId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'like',
  });
  return like;
};