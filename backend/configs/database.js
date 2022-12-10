
const mongo = require('mongoose');
mongo.connect('mongodb://mongo:mongo@localhost:27017/whistProjectDB?authSource=admin'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
