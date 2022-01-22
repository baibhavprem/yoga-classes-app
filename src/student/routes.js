const { Router } = require('express');
const pool = require('../../db');
const queries = require('./queries');

const router = Router();

// =================>>> To show all the Students in the Database  <<<======================
// router.get('/', (req, res) => {
//   pool.query(queries.getStudents, (err, results) => {
//     if (err) throw err;
//     res.status(200).send(results.rows);
//   });
// });

router.get('/new', (req, res) => {
  res.render('student/new');
});

router.post('/new', (req, res) => {
  // Checking if the req body has all the required parameters and also the if age lies in the limit or not
  if (Object.keys(req.body).length < 4 || !req.body.age || req.body.age < 18 || req.body.age > 65) {
    // return res.send('Insufficient Data!');
    return res.status(206).redirect('/new');
  }

  const { id, name, batchID, age } = req.body;

  // Checking if a student with the same id exists already or not
  pool.query(queries.getStudentById, [id], (err, results) => {
    if (results.rows.length) {
      res.status(406).send('User already exists with the given ID.');
      // res.redirect('/student/new');                                   // To be uncommented after this page is made
    }
    else {
      // Adding the student to the db
      pool.query(queries.addStudent, [id, name, batchID, age], (err, results) => {
        if (err) throw err;
        res.status(201).render('student/registerSuccess');

        // res.status(201).send('You have been successfully registered.');
      });
    }
  });
});


router.get('/show', (req, res) => {
  res.render('student/show');
});


router.get('/info', (req, res) => {
  const id = parseInt(req.query.id);

  pool.query(queries.getStudentById, [id], (err, results) => {
    if (err) throw err;

    if (!results.rows.length) {
      return res.send({ error: 'No matching records found.' });
    }
    else {
      res.status(200).send(results.rows[0]);
    }
  });
});


module.exports = router;