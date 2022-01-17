'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Review.init({
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING,
    customer_name: DataTypes.STRING,
    subject: DataTypes.STRING,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
    timestamps:false,
    tableName:'reviews'
  });
  return Review;
};