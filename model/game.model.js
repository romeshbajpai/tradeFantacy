const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    userId: {type:String,required:true,unique:true},
    score: {type:Number,default:0},
    level: { type: Number, default: 1 },
    no_of_moves : { type: Number, default: 0 }
})
const GameModel = mongoose.model('chitChat', gameSchema);

module.exports = GameModel;