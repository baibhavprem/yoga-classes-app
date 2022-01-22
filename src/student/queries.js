const getStudents = 'SELECT * FROM students';
const getStudentById = 'SELECT * FROM students WHERE id = $1';
const addStudent = 'INSERT INTO students (id, name, "batchID", age) VALUES ($1, $2, $3, $4)';
const getStudentsInBatch = 'SELECT * FROM students where "batchID" = $1';

module.exports = {
  getStudents,
  getStudentById, 
  addStudent
};
