const {
    application
} = require("express");
const express = require("express");

const { // destructuring
    users
} = require('./data/users.json');

const dotenv = require("dotenv");

//importing routes
const usersRouter = require("./routes/users.js"); //path for users
const booksRouter = require("./routes/books.js"); //path for books

//const userModel = require("./models/user_model");
//const bookModel = require("./models/book_model");
//use in single line 
//const { userModel, bookModel } = require("../models");
const dbConnection = require("./dbConnections"); //database connection

dotenv.config(); //to run dotenv 

const app = express();

dbConnection();
//only after app

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running",
    });
});

//if any req comes to route /users go to usersRouter
app.use("/users", usersRouter); //Router Functionality
//if any req comes to route /books go to booksRouter
app.use("/books", booksRouter);


app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exist",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});