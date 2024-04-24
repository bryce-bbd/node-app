require('dotenv').config()

// Importing required modules
var express = require('express');

// Creating an Express app
var app = express();
const port = process.env.DB_PORT; // Port number
console.log(port);

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World! This is my Express app.');
});

app.get('/hello', (req, res) => {
  res.send('Hello there!');
});

app.post('/hello', (req, res) => {
  res.send('You just called the post method at "/hello"!\n');
});

app.get('/error', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})

app.get('/user/:id', async (req, res, next) => {
  const user = 'user' + req.params.id;
  res.send(user)
})

//Simple request time logger
app.use(function (req, res, next) {
  console.log("A new request received at " + Date.now());
  next();
});

//Middleware function to log request protocol
app.use('/things', function (req, res, next) {
  console.log("A request for things received at " + Date.now());
  next();
});

// Route handler that sends the response
app.get('/things', function (req, res) {
  res.send('Things');
});

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/home', function (req, res) {
  res.render('home');
});

app.get('/conditional', function (req, res) {
  res.render('conditional', {
    user: { name: "BRYCE", age: "22" }
  });
});

app.get('/dynamic', function (req, res) {
  res.render('dynamic', {
    name: "TutorialsPoint",
    url: "http://www.tutorialspoint.com"
  });
});

app.get('/error', function (req, res) {
  //Create an error and pass it to the next function
  var err = new Error("Something went wrong");
  next(err);
});

/*
* other route handlers and middleware here
* ....
*/

//An error handling middleware
app.use(function (err, req, res, next) {
  res.status(500);
  res.send("Oops, something went wrong.")
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
