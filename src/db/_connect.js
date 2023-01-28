const mongoose = require('mongoose');

function _connect(){
    const MONGO_HOST = "localhost";
    const MONGO_DB = "maxbet";
    const URI = `mongodb://${MONGO_HOST}/${MONGO_DB}`;
}

module.exports = _connect;