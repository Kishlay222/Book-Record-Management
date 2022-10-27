//file for connecting to database with our server

const mongoose = require("mongoose");

function dbConnection() {
    //first get url from env
    const dbUrl = process.env.MONGO_URI;
    //make connection
    mongoose.connect(dbUrl,
        //needed for performance reason without it also it works fine
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

    const db = mongoose.connection; //gives info about the connection established eariler
    //store that info into db

    //on means continously checking
    db.on("error", console.error.bind(console, "Connection Error"));
    //once means only once to check when connection established
    db.once("open", function () {
        console.log("Db Connected");
    });
}

//to use this function outside this file we need to export this fn
module.exports = dbConnection;