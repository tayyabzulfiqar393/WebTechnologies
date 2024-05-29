// Load environment variables from .env file in non-production environments
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

// Import required modules and middleware
const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authentication = require('./middlewares/authenticate')  
const isAdmin = require('./middlewares/isAdmin')
const IndexRouter = require('./Routes/index')
const authorsRouter = require('./Routes/authors')
const booksRouter = require('./Routes/books')
const authRouter = require('./Routes/auth')
const productsRouter = require('./Routes/products'); // Added in Lab Final

const mongoose = require('mongoose')

// Define the port and database URL from environment variables
const PORT = process.env.PORT || 5000;
const DB_KEY = process.env.DATABASE_URL;
const app = express();

// Configure Express to use EJS for templating
app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)

// Middleware for HTTP method overrides (e.g., PUT or DELETE from forms)
app.use(methodOverride('_method'));

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'))

// Middleware to parse JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({limit:'50mb' , extended: false}))

// Configure session management
app.use(session({
secret: 'My Secret Key', 
resave: true,
saveUninitialized: true,
}))

// Route for authentication-related requests
app.use('/auth', authRouter);

// Middleware to authenticate users before accessing book routes
app.use('/', authentication)

// Route for the main index page
app.use('/', IndexRouter);

// Route for author-related requests
app.use('/authors', authorsRouter);

// Route for book-related requests
app.use('/books', booksRouter);

// Route for product-related requests added for the lab final
app.use('/products', productsRouter); 

// Connect to MongoDB database using Mongoose
mongoose
.connect(DB_KEY, { useNewUrlParser: true })
.then(() => console.log("Connected to Mongo...."))
.catch((error) => console.log(error.message));

// Start the Express server and listen on the specified port
app.listen(PORT);
console.log(`App is listening at Port ${PORT} `);
