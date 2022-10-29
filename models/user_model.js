const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    issuedBook: { //as its type is id
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: false
    },
    returnDate: {
        type: String,
        required: true
    },
    subscriptionType: {
        type: String,
        required: true
    },
    subscriptionDate: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);