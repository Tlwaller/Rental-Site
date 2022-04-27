const format = require("pg-format");
const pool = require("../../../db");
const queries = require("./favoritesQueries");

const getFavorites = (req, res) => {
  if (!req.session.user) {
    return res
      .status(201)
      .send("Please sign in to view your favorited listings.");
  }

  pool.query(queries.getFavorites, [req.session.user.id], (error, results) => {
    if (error) throw error;
    res.status(201).send(results.rows);
  });
};

const addFavorite = (req, res) => {
  if (!req.session.user) {
    return res
      .status(201)
      .send("Please sign in or register to add this rental to your favorites.");
  }
  const { parent_unit_id, unit_id } = req.params;
  let unitType = parent_unit_id ? "parent_unit" : unit_id ? "unit" : "";

  pool.query(
    format(queries.addFavorite, unitType, unitType),
    [
      req.session.user.id,
      parent_unit_id ? parent_unit_id : unit_id ? unit_id : "",
    ],
    (error, results) => {
      if (error) throw error;
      return res.status(201).send("Rental added to favorites.");
    }
  );
};

module.exports = {
  getFavorites,
  addFavorite,
};
