const express = require('express')

const router = express.Router()

const Book = require('../Models/books')

router.get('/', async (req, res) => {
  let books
  let flash = req.session.flash
  req.session.flash = null
  try {
    books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
  } catch {
    books = []
  }
  res.render('index', { books: books ,errorMessage: flash})
})




module.exports = router