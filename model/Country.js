const mongoose = require('mongoose')

const CountrySchema = new mongoose.Schema({
    id:{},
    name:{},
    capital:{},
    currency:{},
    timezones:{},
    latitude:{},
    longitude:{},
});

const Country = mongoose.model('countries', CountrySchema);
module.exports = Country;