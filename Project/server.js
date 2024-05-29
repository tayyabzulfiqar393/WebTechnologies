
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

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
const adminRouter = require('./Routes/admin')

const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000;
const DB_KEY = process.env.DATABASE_URL;
const app = express();

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({limit:'50mb' , extended: false}))
app.use(session({
  secret: 'My Secret Key', 
  resave: true,
  saveUninitialized: true,
})
)
app.use('/auth',authRouter);
app.use('/',authentication)
app.use('/',IndexRouter);
app.use('/authors',authorsRouter);
app.use('/books', booksRouter);
app.use('/admin',authentication,isAdmin,)


mongoose
  .connect(DB_KEY, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo...."))
  .catch((error) => console.log(error.message));

app.listen(PORT);
console.log(`App is listening at Port ${PORT} `);


