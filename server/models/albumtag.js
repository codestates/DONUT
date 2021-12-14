'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class albumtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.albumtag.belongsTo(models.lpList, {foreignKey: 'lpListId', targetKey: 'id'});
    }
  };
  albumtag.init({
    lpListId: DataTypes.INTEGER,
    tagName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'albumtag',
  });
  return albumtag;
};