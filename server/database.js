const mongoose = require ('mongoose');
const URI = 'mongodb://localhost:27017/mean-crud';

mongoose.connect(URI)
    .then (db => console.log('La DB esta conectada'))
    .catch(err => console.error(err));

module.exports = mongoose;
