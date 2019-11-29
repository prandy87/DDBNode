//All user related routes are here
const express = require("express");
const mysql = require("mysql");

const router = express.Router();
router.get("/messages", (req, res) => {
  console.log("Here are some messages and stuff...");
  res.end();
});

router.get("/users", (req, res) => {
  const connection = getConnection();
  const queryString = "SELECT * FROM users";
  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    const allUsers = rows.map(row => {
      return { firstName: row.first_name, lastName: row.last_name };
    });
    res.json(allUsers);
  });
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "g8j592pP",
  database: "family_sql"
});

function getConnection() {
  return pool;
}

router.post("/user_create", (req, res) => {
  console.log("tryng to post");

  const firstName = req.body.create_first_name;
  const lastName = req.body.create_last_name;

  const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";

  getConnection().query(
    queryString,
    [firstName, lastName],
    (err, results, fields) => {
      if (err) {
        console.log("Failed to append New User " + err);
        res.status(500);
        return;
      }
      console.log("Inserted a new user with id: " + results.insertId);
      res.end();
    }
  );

  res.end();
});

router.get("/user/:id", (req, res) => {
  console.log("Fetching user with id" + req.params.id);

  const connection = getConnection();

  const userId = req.params.id;
  const queryString = "SELECT * FROM users WHERE id = ?";
  connection.query(queryString, [userId], (err, rows, fields) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    const user = rows.map(row => {
      return { firstName: row.first_name, lastName: row.last_name };
    });

    res.json(user);
  });
});

module.exports = router;
