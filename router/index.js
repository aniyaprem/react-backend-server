const express = require('express')
const router = express.Router();

const {
    login,
    register
} = require('../controller/usercontroller');

const {
    createProduct
} = require('../controller/ProductController');

const {
    addCategory,
    categoryList,
    deleteCatgory
} = require('../controller/CategoryController');

const {
    countries,
    states,
    cities
} = require('../controller/countrystatecontroller');

router.post('/api/v1/register', register);
router.post('/api/v1/login', login);

router.get('/api/v1/countries', countries);
router.get('/api/v1/states/:country_id', states);
router.get('/api/v1/cities/:state_id', cities);

router.post('/api/v1/create-product/', createProduct);
router.post('/api/v1/create-category/', addCategory);
router.get('/api/v1/category-list/', categoryList);
router.get('/api/v1/category-delete/:id', deleteCatgory);

module.exports = router;