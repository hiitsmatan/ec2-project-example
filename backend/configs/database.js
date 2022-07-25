
const mongo = require('mongoose');
mongo.connect('mongodb://mongo:mongo@172.31.29.247:27017/whistProjectDB?authSource=admin'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}