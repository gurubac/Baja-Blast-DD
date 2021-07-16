//create a mongo db user model with the following fields, address, city, state, zip
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
});

const Location = mongoose.model('Location', userSchema);

module.exports = Location;