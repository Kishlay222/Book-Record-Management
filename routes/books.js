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

/**
 * Route: /books
 * Method: POST
 * Description:Create/Add a book 
 * Access:Public
 * Parameter:none
 * Data: id,name,author,genre,price,publisher (need for a new book to add)
 */

router.post("/", (req, res) => {
    const {
        data
    } = req.body;
    //if data is empty for new book 
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "Data not provided"
        });
    }
    //data provided---find any other book with same id exists or not 
    //if exists dont create
    const book = books.find((each) => each.id == data.id);
    if (book) {
        return res.status(404).json({
            success: false,
            message: "Book already exists,use a unique id"
        });
    }
    //if id is unique then
    const newbooklist = [...books, data];
    res.status(200).json({
        success: true,
        data: newbooklist
    });

});

/**
 * Route: /books/{id}
 * Method: PUT
 * Description:Update a book details
 * Access:Public
 * Parameter:id
 * Data: id,name,author,genre,price,publisher (need for a new book to add)
 */

router.put("/:id", (req, res) => {
    const {
        id
    } = req.params;
    const {
        data
    } = req.body;
    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found to update by id"
        });
    }
    const updatedData = books.map((each) => {
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
        data: updatedData
    });
});

/**
 * Route: /books/issued/with-fine
 * Method: GET
 * Description: Get issued books with fine
 * Access: Public
 * Parameters: none
 */

router.get("/issued/with-fine", (req, res) => {
    const usersWithIssuedBooksWithFine = users.filter((each) => {
        if (each.issuedBook) return each;
    });
    const issuedBookWithFine = [];

    //search books which are issued to user from books
    usersWithIssuedBooksWithFine.forEach((each) => {
        const book = books.find((book) => book.id == each.issuedBook);
        //details which we want to show
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;
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
        let returnDate = getDateInDays(each.returnDate);
        let currentDate = getDateInDays();

        if (returnDate < currentDate) {
            issuedBookWithFine.push(book);
        }
    });

    if (issuedBookWithFine.length == 0) {
        return res.status(404).json({
            success: false,
            message: "Book not found with fine"
        });
    }

    res.status(200).json({
        success: true,
        data: issuedBookWithFine
    });

});



module.exports = router;