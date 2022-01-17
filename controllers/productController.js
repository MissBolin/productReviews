const {Product} = require('../models')
const categories = ['appliances', 'pets', 'home goods', 'other'];

module.exports.renderProfile = async function (req, res) {
    const product = await Product.findByPk(
        req.params.id
    );
    res.render('products/profile', {product});
}

module.exports.renderEditForm = async function (req, res) {
    const product = await Product.findByPk(
        req.params.id
    );
    res.render('products/edit', {product, categories});
}

module.exports.updateProduct = async function(req,res){
    await Product.update({
        product_name: req.body.product_name,
        category: req.body.category,
        description: req.body.description
    }, {
        where: {
            id:req.params.id
        }
    });
    res.redirect(`/products/profile/${req.params.id}`);
}

module.exports.viewProducts = async function(req, res){
    const products = await Product.findAll();
    res.render('index', {products})
}

module.exports.renderAddForm = function(req, res){
    const product = {
        product_name: '',
        description: '',
        category: categories[0]
    };
    res.render('products/add', {product, categories});
}

module.exports.addProduct = async function(req, res){
    const result = await Product.create( {
        product_name: req.body.product_name,
        category: req.body.category,
        description: req.body.description
    });
    res.redirect(`/products/profile/${result.id}`)
}

module.exports.deleteProduct = async function(req, res){
    await Product.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect('/products')
}