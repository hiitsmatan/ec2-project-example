
const mongo = require('mongoose');
mongo.connect('mongodb://localhost:27017/whistProjectDB'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
}