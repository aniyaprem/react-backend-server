const express = require('express')
const router = express.Router();

const {
    register
} = require('../controller/usercontroller');

const {
    countries,
    states,
    cities
} = require('../controller/countrystatecontroller');

router.post('/api/v1/register', register);
router.get('/api/v1/countries', countries);
router.get('/api/v1/states/:country_id', states);
router.get('/api/v1/cities/:state_id', cities);

module.exports = router;