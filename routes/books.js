const express = require("express");

const {
    books
} = require("../data/books.json");

const {
    users
} = require("../data/users.json");

const {
    getAllBook,
    getSingleBookById,
    getSingleBookByName,
    getAllIssuedBooks,
    addNewBook,
    updateBookById,

} = require("../controllers/book_controller");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description:Get all books list
 * Access:Public
 * Parameter:none
 */

router.get("/", getAllBook);

/**
 * Route: /books/:id
 * Method: GET
 * Description:Get a specific book from list
 * Access:Public
 * Parameter: id
 */

router.get("/:id", getSingleBookById);

//additional route
router.get("/getBook/name/:name", getSingleBookByName);

/**
 * Route: /books/issued/by-users
 * (as only in /issued its reads the 1st char and points to /id route)
 * Method: GET
 * Description:Get all issued books list
 * Access:Public
 * Parameter:none
 */

router.get("/issued/by-users", getAllIssuedBooks);

/**
 * Route: /books
 * Method: POST
 * Description:Create/Add a book 
 * Access:Public
 * Parameter:none
 * Data: id,name,author,genre,price,publisher (need for a new book to add)
 */

router.post("/", addNewBook);

/**
 * Route: /books/{id}
 * Method: PUT
 * Description:Update a book details
 * Access:Public
 * Parameter:id
 * Data: id,name,author,genre,price,publisher (need for a new book to add)
 */

router.put("/:id", updateBookById);

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