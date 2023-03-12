const express = require('express')
const router = express.Router()
const Author  = require('../models/authors')
const Book = require('../models/books')

//all books route

router.get('/', async (req, res)=>{
    try{
        const books = await Book.find({})
        res.render('books/index', {
            books: books
        })
    }catch{
        res.redirect('/')
    }
})

//new book route
router.get('/new', async (req, res)=>{
    const authors = await Author.find({})
    const book = await new Book()
    console.log(authors)
    
    res.render('books/new', {
        authors: authors,
        book: book
    })
})

//create book route
router.post('/', async (req, res)=>{
    const book = new Book({

    })
})

module.exports = router