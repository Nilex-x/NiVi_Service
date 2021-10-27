const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userModel = new Schema({
    _id: String,
    login: String,
    firstname: String,
    lastname: String,
});

module.exports = model('userModel', userModel)