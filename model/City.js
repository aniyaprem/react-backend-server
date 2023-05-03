const mongoose = require('mongoose')

const CitySchema = new mongoose.Schema({
    id:{},
    name:{},
    state_id:{},
    state_code:{},
    country_id:{},
    country_code:{},
    latitude:{},
    longitude:{},
});

const City = mongoose.model('cities', CitySchema);
module.exports = City;