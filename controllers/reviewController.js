const {Product, Review} = require('../models')

module.exports.renderAddReviewForm = async function (req, res) {
    const product = await Product.findByPk(
        req.params.productId
    );
    const review = {
        customer_name: '',
        subject: '',
        rating: 1,
        description: ''
    }
    res.render('reviews/add', {product, review});
}

module.exports.addReview = async function (req, res) {
    await Review.create({
        customer_name: req.body.customer_name,
        subject: req.body.subject,
        rating: req.body.rating,
        description: req.body.description,
        product_id: req.params.productId
    });
    res.redirect(`/products/profile/${req.params.productId}`)
}

module.exports.renderEditReviewForm = async function (req, res) {
    const review = await Review.findByPk(
        req.params.id
    );
    res.render('reviews/edit', {review});
}

module.exports.updateReview = async function(req, res) {
    const review = await Review.findByPk(
        req.params.id
    );
        await Review.update({
            customer_name: req.body.customer_name,
            subject: req.body.subject,
            rating: req.body.rating,
            description: req.body.description
        }, {
            where: {
                id: req.params.id
            }
        }
    );
    res.redirect(`/products/profile/${review.product_id}`);
}

module.exports.deleteReview = async function(req, res){
    const review = await Review.findByPk(req.params.id);
    await Review.destroy({
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/products/profile/${review.product_id}`);
}

