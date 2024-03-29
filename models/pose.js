'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pose extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.pose.belongsToMany(models.user, { through: 'favorites' })
    }
  }
  pose.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    level: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pose',
  });
  return pose;
};