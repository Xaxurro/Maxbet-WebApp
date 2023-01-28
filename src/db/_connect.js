const mongoose = require('mongoose');

function _connect(){
    const URI = `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB}`;
    mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => 
            {
                console.log("Connection ready to use.");
            },
            (err) => 
            {
                console.log("Connection Error.");
            },
        )
}

module.exports = _connect;