const {
    userModel,
    bookModel
} = require("../models");


exports.getAllUsers = async (req, res) => { //app is not accessible

    const users = await userModel.find();
    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No user found"
        });
    }

    res.status(200).json({ //app is replaced by router
        success: true,
        data: users,
    });
};

exports.getUserById = async (req, res) => {
    const {
        id
    } = req.params; //req is an obj params gives parameter used
    //const user = users.find(each => each.id == id); //each means go to every obj in users array
    //if not found return 404

    const user = await userModel.findById(id);

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
};

exports.createUser = async (req, res) => {
    const {
        //id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    } = req.body;
    /*
    //body is an obj in which we need these parameter to update for creating
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
    */

    const newUser = await userModel.create({
        _id: id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });

    res.status(201).json({
        success: true,
        data: newUser
    });

};

exports.updateUserById = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        data
    } = req.body;
    //const user = users.find((each) => each.id === id);
    /*if (!user) {
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
    */
    const updatedUser = await userModel.findOneAndUpdate({
            _id: id, //find book on basis on id
        },
        //data as used in book update also works
        {
            $set: { //can add additional fields also
                ...data
            }
        }, //add new data from body
        {
            new: true, //to get the updated data
        });
    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "Successfully updated the details"
    });

};

exports.deleteUserById = async (req, res) => {
    const {
        id
    } = req.params;
    //const user = users.find((each) => each.id === id);

    const user = await userModel.deleteOne(id);

    if (!user) {
        res.status(404).json({
            success: false,
            message: "User not Found"
        });
    }
    // const index = users.indexOf(user);
    //users.splice(index, 1);
    //as we are finding the user with deleteOne method so no need to find index

    return res.status(202).json({
        success: true,
        data: user,
        message: "Successfully Deleted the User "
    });

};

exports.subscriptionDetails = async (req, res) => {
    const {
        id
    } = req.params;
    //const user = users.find((each) => each.id === id);
    const user = await userModel.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not Found"
        });
    }
    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            date = new Date(); //current date
        } else {
            date = new Date(data); //string format of given date 
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24)); //starts from 1st jan 1970
        return days;
    };

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date += 90;
        } else if (user.subscriptionType === "Standard") {
            date += 180;
        } else if (user.subscriptionType === "Premium") {
            date += 365;
        }
        return date;
    };

    //Expiration Date
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpirationDate = subscriptionType(subscriptionDate);

    console.log("returnDate", returnDate);
    console.log("currentDate", currentDate);
    console.log("subscriptionDate", subscriptionDate);
    console.log("subscriptionExpDate", subscriptionExpirationDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpirationDate < currentDate,
        daysLeftToExpire: subscriptionExpirationDate <= currentDate ? 0 : subscriptionExpirationDate - currentDate,
        fine: returnDate < currentDate ? subscriptionExpirationDate <= currentDate ? 200 : 100 : 0
    };

    res.status(200).json({
        success: true,
        data
    });

};