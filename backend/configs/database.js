
const mongo = require('mongoose');
mongo.connect('mongodb://mongo:mongo@172.31.81.28:27017/whistProjectDB?authSource=admin'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}