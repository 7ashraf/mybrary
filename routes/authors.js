const express = require('express')
const router = express.Router()
const Author  = require('../models/authors')
//all authors route
router.get('/', async (req, res)=>{
    try {
        const authors = await Author.find({})
        res.render('authors/index', {
            authors:authors
        })

    }catch {
        res.redirect('/')
    }
})

//new author route
router.get('/new', (req, res)=>{
    res.render('authors/new', {author: new Author()})
})

//create author route
router.post('/', async (req, res)=>{
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save()
        res.redirect('authors')
    }catch{
        res.render('authors/new', {
            author:author,
            errorMessage: 'Error creating author'
        })
    }
})

async function renderNewPage(res, author, hasError = false){
    try {
        const authors = await Author.find({})
        res.render('books/new',{
            authors: authors,
            book: book
        })
    } catch (error) {
        
    }
}

module.exports = router