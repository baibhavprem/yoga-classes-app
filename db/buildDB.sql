CREATE DATABASE yogadb;

CREATE TABLE IF NOT EXISTS batches
(
    id serial NOT NULL PRIMARY KEY,
    timeslot varchar(16)
);

CREATE TABLE IF NOT EXISTS students
(
    id bigint NOT NULL PRIMARY KEY,
    name varchar(255) NOT NULL,
    batchID integer NOT NULL,
    age integer NOT NULL,
    FOREIGN KEY (batchID) REFERENCES batches(id)
);

CREATE TABLE IF NOT EXISTS payments
(
    studentID bigint,
    dateOfPayment date,
    amount integer,
    validupto date,
    FOREIGN KEY (studentID) REFERENCES students(id) 
);

CREATE TABLE IF NOT EXISTS batchHistory
(
    studentID bigint,
    batchID integer,
    fromDate date,
    toDate date,
    FOREIGN KEY (batchID) REFERENCES batches(id)
    FOREIGN KEY(studentID) REFERENCES students(id)
);


INSERT INTO batches (id, timeslot) values (1, '6 - 7AM'), (2, '7 - 8AM'), (3, '8 - 9AM'), (4, '5 - 6PM');