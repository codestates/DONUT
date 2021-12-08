'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.post.belongsTo(models.user, {foreignKey: 'userId', targetKey: 'id', onDelete: 'cascade'}); // post는 user에 속함
      models.post.belongsToMany(models.hashtag, {through: 'postHashtag', foreignKey: 'postId', onDelete: 'cascade'});
      models.post.hasMany(models.comment, {foreignKey: 'postId', sourceKey: 'id', onDelete: 'cascade'});
      models.post.hasMany(models.like, {foreignKey: 'postId', sourceKey: 'id', onDelete: 'cascade'});
    }
  };
  post.init({
    userId: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    writing: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};