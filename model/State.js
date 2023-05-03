const mongoose = require('mongoose')

const StateSchema = new mongoose.Schema({
    id:{},
    name:{},
    country_id:{},
    country_code:{},
    state_code:{},
    latitude:{},
    longitude:{},
});

const State = mongoose.model('states', StateSchema);
module.exports = State;