const express = require('express');
const router = express.Router();
const faker = require('faker');

const Product = require('../model/Products');

const escapeRegex = require('../helper/regex-escape');

router.get('/add-product', async (req, res) => {
    try {
        res.render('Shop/shop-index.ejs', {
            title: 'Home'
        });
    } catch (err) {
        throw new Error(err);
    }
});

router.post('/add-product', async (req, res) => {

    try {
        let product = new Product();

        product.category = req.body.category_name
        product.name = req.body.product_name
        product.price = req.body.product_price
        product.cover = faker.image.image()

        product.save((err) => {
            if(err) throw err
            res.redirect('/add-product')
        })
    } catch (err) {
        throw new Error(err);
    }
});


router.get('/generate-fake-data', function(req, res, next) {
    for (var i = 0; i < 90; i++) {
        var product = new Product()

        product.category = faker.commerce.department()
        product.name = faker.commerce.productName()
        product.price = faker.commerce.price()
        product.cover = faker.image.image()

        product.save(function(err) {
            if (err) throw err
        })
    }
    res.redirect('/add-product')
})

router.get('/products/:page', async (req, res, next) => {
    const perPage = 9;
    const page = req.params.page || 1;

    try {
        Product
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, products) => {
                Product.count().exec((err, count) => {
                    if(err) return next(err);
                    res.render('Shop/shop-products.ejs', {
                        title: 'Products',
                        products: products,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    });
                });
            });
    } catch (err) {
        throw new Error(err);
    }
});

/* 
router.get('/:page', async (req, res, next) => {
    const resPerPage = 9;
    const page = req.params.page || 1;

    try {
        if(req.query.search) {
            // Declaring query based/search variable
            const searchQuery = req.query.search;
            const regex = new RegExp(escapeRegex(req.query.search), 'gi');

            // Find Demanded Products - skipping page values, limit results per page
            const foundProducts = await Product.find({ name: regex})
                .skip((resPerPage * page) - resPerPage)
                .limit(resPerPage);

            // count how many products were found
            const numOfProducts = await Product.count({ name: regex });

            // render the page
            res.render('Shop/shop-products.ejs', {
                title: 'Page count',
                products: foundProducts,
                currentPage: page,
                pages: Math.ceil(numOfProducts / resPerPage),
                searchVal: searchQuery,
                numOfResults: numOfProducts
            });
        }
    } catch (err) {
        throw new Error(err);
    }
})
 */
module.exports = router;