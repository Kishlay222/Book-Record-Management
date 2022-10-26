# Book-Record-Management

# kishlay kumar singh

This is a book record management...

# Routes and Endpoints

Endpoints are the channel through which we can communicate ex- /user

## /users

(to add a emoji 'fn+start' btn + ';')
POST: Create a new user (send data to server) ✅
GET: Get all list of users (get data grom server) ✅

## /users/{id}

GET: Get a user by id ✅
PUT: Update a user by id (update certain fields) ✅
DELETE: Delete a user by id(check if he/she still has an issued book)
(is there any fine to be paid) ---(delete data from server) ✅

## /users/subscription-details/{id}

GET: Get user subscription details

1. Date of subscription
2. Expiration date
3. Fine(if any)

## /books

GET: Get all list of books ✅
POST: Create/Add a new book ✅

## /books/{id}

GET: Get a book by id ✅
PUT: Update a book status by id ✅

## /books/issued/by-users

GET: Get all issued books ✅

## /books/issued/withFine

GET: Get all issued books with fine
fine: can be generated on server with Date in js

# Subscription Types

Basic (3 months)
Standard (6 months)
Premium (12 months)

If the subscription date is 24/10/22
and Subscription Type is Standard then,
the expiration date will be 24/04/23..

# Fine within Subscription Period

If he has an issued book and the issued book has to be returned at 24/11/22
and he missed the date of return,
then he gets a fine of Rs.100

# Fine after the Expiration of Subscription Period

If he has an issued book and the issued book has to be returned at 24/11/22
and he missed the date of return and his subscription expires
then he gets a fine of additional Rs.200
(excluding the fine within Subscription Period)
