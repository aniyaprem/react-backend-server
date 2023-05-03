const Country = require('../model/Country')
const State = require('../model/State')
const City = require('../model/City')
var colors = require('colors');

exports.countries = async (req, res, next)=>{
    try{
        const countries = await Country.find();
        if(!countries){
            res.status(400).json({
                success:false,
                error:'No countries found!'
            });
        }

        res.status(200).json({
            success:true,
            data:countries
        })
    }catch(err){
        console.log(err.red)
        next(err)
    }
}

exports.states = async (req, res, next)=>{
    try{
        let country_id = parseInt(req.params.country_id);
        const states = await State.find({country_id:country_id});
        if(states.length<0){
            res.status(400).json({
                success:false,
                error:'No states found!'
            });
        }

        res.status(200).json({
            success:true,
            data:states
        })
    }catch(err){
        console.log(err)
        next(err)
    }
}

exports.cities = async (req, res, next)=>{
    try{
        const cities = await City.find({state_id:req.params.state_id});
        if(!cities){
            res.status(400).json({
                success:false,
                error:'No cities found!'
            });
        }

        res.status(200).json({
            success:true,
            data:cities
        })
    }catch(err){
        console.log(err.red.bold)
        next(err)
    }
}