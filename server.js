require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');

//enviornment variables
SECRET_SESSION = process.env.SECRET_SESSION
console.log('>>>>>>>>>>>>>', SECRET_SESSION);

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(flash());            // flash middleware

app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

//add passport
app.use(passport.initialize());      // Initialize passport
app.use(passport.session());         // Add a session

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// add passport

// app.get('/', (req, res) => {
//   axios.get('https://yoga-api-nzy4.onrender.com/v1/categories')
//     .then(function (response) {
//       // handle success
//       return res.render('index', { categories: response.data }) // response.data
//     })
//     .catch(function (error) {
//       res.json({ message: 'Data not found. Please try again later.' });
//     });
// });

app.get('/', (req, res) => {
  axios.get('https://yoga-api-nzy4.onrender.com/v1/categories')
    .then(function (response) {
      const categories = response.data;
      console.log(categories);
      return res.render('index', { categories, categoriesByLevels: [] }); // Pass an empty array for categoriesByLevels
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
});


// Categories Route by Id
app.get('/categories/:id', (req, res) => {
  axios.get('https://yoga-api-nzy4.onrender.com/v1/categories?id=' + req.params.id)
    .then(function (response) {
      // handle success
      console.log(response)
      return res.render('categories-by-id', { category: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
});

// Categories Route by Id
app.get('/categories/:id', (req, res) => {
  axios.get('https://yoga-api-nzy4.onrender.com/v1/categories?id=' + req.params.id)
    .then(function (response) {
      // handle success
      console.log(response)
      return res.render('categories-by-id', { category: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
});

//POSES ROUTE:
app.get('/poses', (req, res) => {
  axios.get('https://yoga-api-nzy4.onrender.com/v1/poses')
    .then(function (response) {
      // handle success
      console.log(response.data)
      return res.render('poses', { poses: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.use('/auth', require('./controllers/auth'));

// Add this above /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
