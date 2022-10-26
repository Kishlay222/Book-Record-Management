const express = require("express");

const {
    books
} = require("../data/books.json");

const {
    users
} = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description:Get all books list
 * Access:Public
 * Parameter:none
 */

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description:Get a specific book from list
 * Access:Public
 * Parameter: id
 */

router.get("/:id", (req, res) => {
    const {
        id
    } = req.params;
    const book = books.find((each) => each.id === id);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not Found"
        });
    }
    res.status(200).json({
        success: true,
        data: book
    });
});

/**
 * Route: /books/issued/by-users
 * (as only in /issued its reads the 1st char and points to /id route)
 * Method: GET
 * Description:Get all issued books list
 * Access:Public
 * Parameter:none
 */


router.get("/issued/by-users", (req, res) => {
    const usersWithIssuedBooks = users.filter((each) => {
        if (each.issuedBook) return each; //filtering users having issuedBook property
    });


    const issuedBooks = []; //forEach is loop
    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);

    });

    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Books Issued"
        });
    }

    res.status(200).json({
        success: true,
        data: issuedBooks
    });
});


module.exports = router;