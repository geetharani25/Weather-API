// user.ts
const mon = require('mongoose');
const weatherSchema = new mon.Schema({
    cityname:{
        type: String,
        unique: true,
    },
    temperature:{
        type: Number
    },
    humidity:{
        type: Number
    },
    weather:{
        type: String
    }
});
exports.Weather = mon.model("Weather",weatherSchema);