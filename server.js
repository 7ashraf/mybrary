if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const authorsRouter = require('./routes/authors')
const booksRouter = require('./routes/books')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')



mongoose.set('strictQuery', true);

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use('/', indexRouter)
app.use('/authors', authorsRouter)
app.use('/books', booksRouter)
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db = mongoose.connection
db.on('error', error=> console.error(error))
db.once('open', ()=> console.log('connected to db'))
app.listen(process.nextTick.PORT || 3000)
