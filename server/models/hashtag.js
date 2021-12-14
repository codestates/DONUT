'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.hashtag.belongsToMany(models.post, {through: 'postHashtag'});
    }
  };
  hashtag.init({
    postId: DataTypes.INTEGER,
    hashtagName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hashtag',
  });
  return hashtag;
};