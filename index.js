const express = require("express");

const { // destructuring
    users
} = require('./data/users.json');

const app = express();
const PORT = 8081;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is running",
    });
});

/**
 * Route: /users
 * Method: GET
 * Description:Get all user list
 * Access:Public
 * Parameter:none  (To add parameter we use ':' before parameter)
 */
app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description:Get a specific user
 * Access:Public
 * Parameter:id  (To add parameter we use ':' before parameter)
 */
app.get("/users/:id", (req, res) => {
    const {
        id
    } = req.params; //req is an obj params gives parameter used
    const user = users.find(each => each.id == id); //each means go to every obj in users array
    //if not found return 404
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Not Found",
        });
    }
    //if found
    res.status(200).json({
        success: true,
        data: user,
    });
});

/**
 * Route: /users
 * Method: POST
 * Description:Create a user
 * Access:Public
 * Parameter:none 
 */
app.post("/users", (req, res) => {
    const {
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    } = req.body; //body is an obj in which we need these parameter to update for creating
    const user = users.find((each) => each.id == id); //each means go to every obj in users array
    //if found ,then can't create user with this id
    if (user) {
        return res.status(404).json({
            success: false,
            message: "User Found with Same Id can't create a new",
        });
    }
    //if not found-- create by pushing data
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });
    res.status(201).json({
        success: true,
        data: users,
    });

});

/**
 * Route: /users/:id
 * Method: PUT
 * Description:Update a user details
 * Access:Public
 * Parameter:id
 */

app.put("/users/:id", (req, res) => {
    const {
        id
    } = req.params;
    const {
        data
    } = req.body;
    const user = users.find((each) => each.id === id);
    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not Found"
        });
    }
    const updatedData = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data //updation from req.body as its equal to data
            };
        }
        return each;
    });
    res.status(200).json({
        success: true,
        data: updatedData,
        message: "Successfully updated the details"
    });

});

app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exist",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});