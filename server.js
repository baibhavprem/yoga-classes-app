const express = require('express');
const studentRouter = require('./src/student/routes');
const paymentRouter = require('./src/payment/routes');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false })) // This has to be set before app.use studentRouter 
app.set('view engine', 'ejs');
app.use('/student', studentRouter);
app.use('/payment', paymentRouter);

// Home Page route
app.get('/', (req, res) => {
  res.render('index');
});

// 404 Page route
app.get('*', (req, res) => {
  res.render('partials/404');
})

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});