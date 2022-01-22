const { Router } = require('express');
const pool = require('../../db');
const queries = require('./queries');
const { getDate } = require('./dates');

const router = Router();

router.get('/new', (req, res) => {
  res.render('payment/new');
});

router.post('/makePayment', (req, res) => {
  // Checking if sufficient data is provided or not
  if (Object.keys(req.body).length < 3) {
    return res.status(206).redirect('/new');
  }

  const { studentID, amount, batchID } = req.body;
  const dateOfPayment = getDate(0);
  const validUpto = getDate(1); // Offset is 1 which will add 1 month to the current date

  // "recordFound" stores the status of if there exists an account with the given ID or not.
  recordFound = 0;
  pool.query(queries.getStudentById, [studentID], (err, results) => {
    if (!results.rows.length) {
      recordFound = 1;
      return res.send('No account with the given Student ID');
    }
  });

  if (!recordFound) {
    // Checking for past payments and updating the validUpto by adding to previous value if any
    pool.query(queries.getLastPaymentValidity, [studentID], (err, results) => {
      if (err) throw err;

      // If there exists a previous validity which hasn't expired yet then we extend the previous validity itself
      if (results.rows.length && results.rows[0].validUpto > dateOfPayment) {
        const newValidity = results.rows[0].validUpto;
        newValidity.setMonth(newValidity.getMonth() + 1);

        pool.query(queries.addPayment, [studentID, dateOfPayment, amount, newValidity, batchID], (err, results) => {
          if (err) throw err;
          return res.status(201).render('payment/paymentSuccess');

          // return res.status(201).send('Your payment was made Successfully!');    // For POSTMAN testing
        });
      }
      else {
        // Otherwise making a new payment with todays date + 1 month validity and updating in the payments table
        pool.query(queries.addPayment, [studentID, dateOfPayment, amount, validUpto, batchID], (err, results) => {
          if (err) throw err;
          return res.status(201).render('payment/paymentSuccess');

          // return res.status(201).send('Your payment was made Successfully!');    // For POSTMAN testing
        });
      }
    });
  }
});

router.get('/info', (req, res) => {
  res.render('payment/info');
});

router.get('/paymentHistory', (req, res) => {
  if (!req.query.id)
    return res.send({ error: 'No ID provided' });

  const studentID = parseInt(req.query.id);
  pool.query(queries.getPaymentDetailsById, [studentID], (err, results) => {
    if (err) throw err;

    if (!results.rows.length)
      return res.send({ error: 'No records found with the given ID' });
    else
      return res.status(200).send(results.rows);
  });
});


module.exports = router;