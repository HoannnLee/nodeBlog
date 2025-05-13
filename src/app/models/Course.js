const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    countPeople: {type: Number},
    videoQuantity: {type: Number},
    createdAt: {type: Date , default: Date.now},
    updatetedAt: {type: Date , default: Date.now}
});

module.exports = mongoose.model('Course' , Course)