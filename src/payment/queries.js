const addPayment = 'INSERT INTO payments ("studentID", "dateOfPayment", "amount", "validUpto", "batchID") values ($1, $2, $3, $4, $5)';

const getPaymentDetailsById = 'SELECT s.name, p."batchID", b.timeslot, p.amount, p."dateOfPayment", p."validUpto" FROM students s INNER JOIN payments p ON s.id = p."studentID" AND s.id = $1 INNER JOIN batches b ON p."batchID" = b.id ORDER BY p."validUpto" DESC';

const updateBatchID = 'UPDATE students SET "batchID" = $1 where id = $2';

const getLastPaymentValidity = 'SELECT "validUpto" FROM payments WHERE "studentID" = $1 ORDER BY "validUpto" DESC LIMIT 1';

const getStudentById = 'SELECT * FROM students WHERE id = $1';


module.exports = {
  addPayment,
  getPaymentDetailsById,
  updateBatchID,
  getLastPaymentValidity,
  getStudentById
}


//  ------------------------------------------>> Test Queries <<----------------------------------------------------

// INSERT INTO payments("studentID", "dateOfPayment", "amount", "validUpto", "batchID") values(1, '16-1-2022', 1000, '15-3-2022', 2);

// SELECT s.name, p."batchID", b.timeslot, p."validUpto" FROM students s INNER JOIN payments p ON s.id = p."studentID" AND s.id = 1 INNER JOIN batches b ON p."batchID" = b.id ORDER BY p."validUpto" DESC;

// SELECT "validUpto" FROM payments WHERE "studentID" = 1 ORDER BY "validUpto" LIMIT 1;