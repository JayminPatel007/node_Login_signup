const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    gender: String,

    birthDate: Date,

    address: String,

    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);