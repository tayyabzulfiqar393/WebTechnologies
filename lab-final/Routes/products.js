// Importing necessary modules and models
const express = require('express');
const router = express.Router();
const Product = require('../Models/product'); // Importing Product model

// Route to display a single product by its ID
router.get('/:id', async (req, res) => {
    try {
        // Find the product by ID
        const product = await Product.findById(req.params.id).exec();

        // Initialize visitedProducts array in session if not already present
        if (!req.session.visitedProducts) {
            req.session.visitedProducts = [];
        }

        // Add the product ID to visitedProducts array in session if not already present
        if (!req.session.visitedProducts.includes(req.params.id)) {
            req.session.visitedProducts.push(req.params.id);
        }

        // Render the product details page with the product data
        res.render('products/show', { product });
    } catch {
        // If an error occurs, redirect to the homepage
        res.redirect('/');
    }
});

// Route to display visited products
router.get('/visited-products', async (req, res) => {
    try {
        // Get the array of visited product IDs from session or initialize as empty array
        const visitedProductIds = req.session.visitedProducts || [];

        // Find visited products based on their IDs
        const visitedProducts = await Product.find({ _id: { $in: visitedProductIds } }).exec();

        // Render the visited products page with the visited products data
        res.render('products/visited', { visitedProducts });
    } catch {
        // If an error occurs, redirect to the homepage
        res.redirect('/');
    }
});

// Export the router
module.exports = router;
