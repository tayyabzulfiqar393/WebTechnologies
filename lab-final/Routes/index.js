const express = require('express')

const router = express.Router()

const Product = require('../Models/product'); //added for final Exam

// const Book = require('../Models/books')

// router.get('/', async (req, res) => {
//   let books
//   let flash = req.session.flash
//   req.session.flash = null
//   try {
//     books = await Book.find().sort({ createdAt: 'desc' }).limit(10).exec()
//   } catch {
//     books = []
//   }
//   res.render('index', { books: books ,errorMessage: flash})
// })


// Home page route modified for final exam
router.get('/', async (req, res) => {
  try {
      const featuredProducts = await Product.find({ isFeatured: true }).limit(5).exec();
      console.log(featuredProducts);
      res.render('index', { featuredProducts });
  } catch {
      res.redirect('/');
  }
});




module.exports = router