if (process.env.NODE_ENV !== 'production') {
  
    require('dotenv').config()
  }
  
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
  
  const express = require('express')
  const expressLayouts = require('express-ejs-layouts');
  const mongoose = require('mongoose');
  const passport = require('passport');
  const flash = require('connect-flash');
  const session = require('express-session');
  const app = express()
  const fs = require('fs')
  const stripe = require('stripe')(stripeSecretKey)
 
// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

//
  app.set('view engine', 'ejs')
  app.use(express.json())
  app.use(express.static('public'))
  
  app.get('/store', function(req, res) {
    fs.readFile('items.json', function(error, data) {
      if (error) {
        res.status(500).end()
      } else {
        res.render('store.ejs', {
          stripePublicKey: stripePublicKey,
          items: JSON.parse(data)
        })
      }
    })
  })
  
  app.post('/purchase', function(req, res) {
    fs.readFile('items.json', function(error, data) {
      if (error) {
        res.status(500).end()
      } else {
        const itemsJson = JSON.parse(data)
        const itemsArray = itemsJson.music.concat(itemsJson.merch)
        let total = 0
        req.body.items.forEach(function(item) {
          const itemJson = itemsArray.find(function(i) {
            return i.id == item.id
          })
          total = total + itemJson.price * item.quantity
        })
  
        stripe.charges.create({
          amount: total,
          source: req.body.stripeTokenId,
          currency: 'usd'
        }).then(function() {
          console.log('Charge Successful')
          res.json({ message: 'Successfully purchased items' })
        }).catch(function() {
          console.log('Charge Fail')
          res.status(500).end()
        })
      }
    })
  })
  
  app.listen(3000)
