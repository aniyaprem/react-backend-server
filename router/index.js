const express = require('express')
const router = express.Router();

const {
    login,
    register
} = require('../controller/UserController');

const {
    createProduct,
    deleteProduct,
    productList,
} = require('../controller/ProductController');

const {
    addCategory,
    categoryList,
    deleteCatgory,
    singleCategory, 
    updateCategory
} = require('../controller/CategoryController');

const {
    countries,
    states,
    cities
} = require('../controller/CountryStateController');

router.post('/api/v1/login', login);
router.post('/api/v1/register', register);

router.get('/api/v1/countries', countries);
router.get('/api/v1/cities/:state_id', cities);
router.get('/api/v1/states/:country_id', states);

router.get('/api/v1/product-list/', productList);
router.post('/api/v1/create-product/', createProduct);

router.get('/api/v1/category-list/', categoryList);
router.post('/api/v1/create-category/', addCategory);
router.get('/api/v1/single-category/:id', singleCategory);
router.put('/api/v1/update-category/:id', updateCategory);
router.delete('/api/v1/category-delete/:id', deleteCatgory);
router.delete('/api/v1/product-delete/:id', deleteProduct);

module.exports = router;