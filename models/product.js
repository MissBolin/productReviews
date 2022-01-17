'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Review, {
        foreignKey:'product_id',
        as: 'reviews'
      })
    }
  };
  Product.init({
    product_name: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    rating:{
      type:DataTypes.VIRTUAL,
      get(){
        const reviewCount = this.reviews.length;
        if (!reviewCount){
          return 0;
        }
        let total = 0;
        for (let i=0; i<reviewCount; i++){
          total+= this.reviews[i].rating;
        }
        return total/reviewCount;
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    timestamps:false,
    tableName:'products'
  });
  return Product;
};