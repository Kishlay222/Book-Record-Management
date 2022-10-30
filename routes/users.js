const express = require("express");
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    subscriptionDetails
} = require("../controllers/user_controller");

const {
    users
} = require("../data/users.json");

const router = express.Router(); //Initialization of Router

/**
 * Route: /users
 * ( NOTE: here we don't need to specify /users in each route as
 * we get in this file using /users route
 * so, /users/2===/2 )
 * Method: GET
 * Description:Get all user list
 * Access:Public
 * Parameter:none  (To add parameter we use ':' before parameter)
 */
router.get("/", getAllUsers);

/**
 * Route: /users/:id
 * Method: GET
 * Description:Get a specific user
 * Access:Public
 * Parameter:id  (To add parameter we use ':' before parameter)
 */
router.get("/:id", getUserById);

/**
 * Route: /users
 * Method: POST
 * Description:Create a user
 * Access:Public
 * Parameter:none 
 */
router.post("/", createUser);

/**
 * Route: /users/:id
 * Method: PUT
 * Description:Update a user details
 * Access:Public
 * Parameter:id
 */
router.put("/:id", updateUserById);

/**
 * Route: /users/id
 * Method: DELETE
 * Description:Delete a user
 * Access:Public
 * Parameter: id
 */
router.delete("/:id", deleteUserById);

/**
 * Route: /users/subscription-details/id
 * Method: GET
 * Description:Get a user's subscription-details
 * Access:Public
 * Parameter: id
 */
router.get("/subscription-details/:id", subscriptionDetails);

//default export(1 param)
module.exports = router; //to access router var outside this file in index.js

//non default export for more than 1 para stored as obj
//  {router}