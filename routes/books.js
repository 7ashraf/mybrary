const express = require('express')
const multer= require('multer')
const router = express.Router()
const Author  = require('../models/authors')
const Book = require('../models/books')
const path = require('path')
const { render } = require('ejs')
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimTypes= ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']


//all books route

router.get('/', async (req, res)=>{
    let query = Book.find({})
    if(req.query.title != null && req.query.title != ''){
        query = query.regex('title', new RegExp(req.query.title, 'i'))
    }
    try {
        const books = await query.exec()
        res.render('books/index', {
            books: books,
            searchOptions: req.query
           })
        
    } catch (error) {
        res.redirect('books/index')
    }
   
})

//new book route
router.get('/new', async (req, res)=>{
    
    renderNewPage(res, new Book())
})

//create book route
router.post('/', async (req, res)=>{
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: req.body.publishDate,
        pageCount: req.body.pageCount,
        description: req.body.description

    })
    saveCover(book, req.body.cover)

    try {
        const newBook = await book.save()
        res.redirect('books')
    } catch (error) {
        console.log(error)
        renderNewPage(res, book, true)
    }
})

async function renderNewPage(res, book, hasError = false) {
    try {
      const authors = await Author.find({})
      const params = {
        authors: authors,
        book: book
      }
      if (hasError) params.errorMessage = 'Error Creating Book'
      res.render('books/new', params)
    } catch {
      res.redirect('/books')
    }
  }
function saveCover(book, coverEncode){
    if(coverEncode ==null) return
    const cover = JSON.parse(coverEncode)
    if(cover!=null && imageMimTypes.includes(cover.type)){
        book.coverImage = new Buffer.from(cover.data, 'base64')
        book.coverImageType = cover.type
    }
}


module.exports = router