const {
    userModel,
    bookModel
} = require("../models");
const IssuedBook = require("../dtos/book_dto");

exports.getAllBook = async (req, res) => {
    const books = await bookModel.find();
    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No book found"
        });
    }
    res.status(200).json({
        success: true,
        data: books
    });

};

exports.getSingleBookById = async (req, res) => {
    const {
        id
    } = req.params;

    //const book = books.find((each) => each.id === id);
    //changed
    const book = await bookModel.findById(id);

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
};

exports.getAllIssuedBooks = async (req, res) => {
    /*const usersWithIssuedBooks = users.filter((each) => {
         if (each.issuedBook) return each; //filtering users having issuedBook property
     });


    const issuedBooks = []; //forEach is loop
    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);
        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);

    });*/
    const users = await userModel.find({
        //category: "plants"---syntax
        issuedBooks: {
            $exists: true
        },
    }).populate("issuedBook");
    //after getting user data go to issued book(which is id) field and make another req
    //go to model and check in book model by id
    //repace issued book data as obj to store all books data
    const issuedBooks = users.map((each) => new IssuedBook(data));
    //dto --data transformed obj

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
};