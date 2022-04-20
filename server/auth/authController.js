const pool = require("../db");
const queries = require("./userQueries");
const bcrypt = require("bcryptjs");

const getUser = (req, res) => {
  req.session.user
    ? res.status(201).send(req.session.user)
    : res.status(201).send("Please sign in");
};

const register = (req, res) => {
  pool.query(queries.getUser, [req.body.username], (error, results) => {
    if (error) throw error;
    if (results.rows[0]) {
      return res.status(201).send("That username is taken.");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      pool.query(
        queries.createUser,
        [
          req.body.user_type,
          req.body.first_name,
          req.body.last_name,
          req.body.address,
          req.body.contact_number,
          req.body.email_address,
          req.body.username,
          hash,
        ],
        (error, results) => {
          if (error) throw error;
          req.session.user = results.rows[0];
          res.status(201).send(req.session.user);
        }
      );
    }
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  pool.query(queries.getUser, [username], (error, results) => {
    if (error) throw error;
    if (results.rows[0]) {
      if (bcrypt.compareSync(password, results.rows[0].password)) {
        req.session.user = results.rows[0];
        return res.status(201).send(`Welcome, ${req.session.user.username}!`);
      } else return res.status(201).send("Username/password incorrect");
    } else return res.status(201).send("Username/password incorrect");
  });
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(201).send("Successfully logged out.");
};

module.exports = {
  getUser,
  register,
  login,
  logout,
};
