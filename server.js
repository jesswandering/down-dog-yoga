require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');

const db = require('./models');

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

app.get('/', (req, res) => {
  res.render('index')
});

// app.use('/auth', require('./controllers/'))

//Route for Categories
app.get('/categories', (req, res) => {
  axios.get('https://yoga-api-nzy4.onrender.com/v1/categories')
    .then(function (response) {
      const categories = response.data;
      console.log(categories);
      res.render('categories', { categories });
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
      return res.render('category', { category: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
});

// Route for ALL POSES:
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

// Route for POSES by Id
app.get('/poses/:id', (req, res) => {
  axios.get('https://yoga-api-nzy4.onrender.com/v1/poses?id=' + req.params.id)
    .then(function (response) {
      // handle success
      console.log(response.data)
      return res.render('pose', { pose: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
});

// Route for Poses by LEVEL
app.get('/search-level', (req, res) => {
  return res.render('search-level')
});

// Get route for route for favorites
// app.get('/favorites', function (req, res) {
//   console.log(req.user.id)
//   db.user.findByPk(req.user.id).then(user => {
//     console.log(user)
//   })
// return res.render('favorites')
// const poseData = req.body;
// res.status(200).json({ message: 'Pose added to favorites successfully' });
// });

// // Post route for Favorites
// app.post('/favorites', function (req, res) {
//   // print req.body to console.
//   console.log('favorites data', req.body);
//   // return res.json with the body information
//   return res.json({ data: req.body })
// })

// app.post('/add-to-favorites', (req, res) => {
//   const poseData = req.body; // Assuming you've set up body parsing middleware

//   // Process the poseData and add it to the favorites list

//   // Return a response indicating success or any relevant information
//   res.json({ message: 'Pose added to favorites' });
// });



app.post('/add-to-favorites', (req, res) => {
  // console.log('where are you?', req)
  db.user.findOne({ where: { id: req.user.id } })
    .then(user => {
      console.log('<--------user-------->', user)
      db.pose.findOne({ where: { id: req.body.id } })
        .then(pose => {
          console.log('------pose------', pose)
          user.addPose(pose)
            .then(data => {
              console.log('--------data---------', data)
              res.redirect('/favorites')
            })
        })
    })
});

app.get('/favorites', (req, res) => {
  // Retrieve the favorites data from wherever you store it (e.g., a database)
  console.log('favorites route')
  const { id, name, email } = req.user
  db.user.findOne({
    where: {
      id: req.user.id
    }
  })
    .then(user => {
      console.log('user....where are you....?', user)
      user.getPoses()
        .then(favorites => {
          if (favorites.length > 0) {
            console.log("favorites", favorites)
            res.render('favorites', { id, name, email, favorites })
          } else {
            res.render('favorites', { id, name, email, favorites: [] })
          }
        })
        .catch(error => {
          console.log('error', error);
          let message = 'Cannot load poses. Please try again later...';
          res.render('error', { message });
        });
    })
    .catch(error => {
      console.log('error', error);
      let message = 'Cannot find user. Please try again later...';
      res.render('error', { message });
    })
});

db.user.findOne()
  .then(user => {
    // load poses for this user
    user.getPoses().then(poses => {
      //do something with poses here
      console.log(`${user.name}'s poses:`)
      console.log(poses.name)
    })
  })

// Delete Route
app.delete("/delete/:id", (req, res) => {
  console.log('-----------delete route----------------')
  db.user.findOne({ where: { id: req.user.id } })
    .then(user => {
      db.pose.findOne({ where: { id: req.params.id } })
        .then(pose => {
          user.deletePose(pose)
            .then(data => {
              res.redirect('/favorites')
            })
        })
    })
})


// Post Route for Search by level
app.post("/search-level", (req, res) => {
  axios.get('https://yoga-api-nzy4.onrender.com/v1/poses?level=' + req.body.level)
    .then(function (response) {
      // handle success
      console.log(response.data)
      return res.render('poses-by-level', { poses: response.data.poses })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
})

// Route to Search
app.get("/search", (req, res) => {
  return res.render('search');
});

// Post Route for Search Poses
app.post("/search", (req, res) => {
  axios.get('https://yoga-api-nzy4.onrender.com/v1/poses?name=' + req.body.pose)
    .then(function (response) {
      // handle success
      console.log(response.data)
      return res.render('pose', { pose: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
})

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
