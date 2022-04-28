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
  const rentalId = parent_unit_id ? parent_unit_id : unit_id ? unit_id : "";
  let unitType = parent_unit_id ? "parent_unit" : unit_id ? "unit" : "";

  pool.query(
    format(queries.checkRental, unitType),
    [rentalId],
    (error, results) => {
      if (error) throw error;
      if (results.rows[0]) {
        pool.query(
          format(queries.addFavorite, unitType, unitType),
          [req.session.user.id, rentalId],
          (error, results) => {
            if (error) throw error;
            return res.status(201).send("Rental added to favorites.");
          }
        );
      } else {
        return res.status(201).send("Rental not found in database.");
      }
    }
  );
};

const deleteFavorite = (req, res) => {
  if (!req.session.user) {
    return res
      .status(201)
      .send(
        "Please sign in or register to remove this rental from your favorites."
      );
  }
  const { parent_unit_id, unit_id } = req.params;
  let unitType = parent_unit_id ? "parent_unit" : unit_id ? "unit" : "";

  pool.query(
    format(queries.deleteFavorite, unitType, unitType),
    [
      req.session.user.id,
      parent_unit_id ? parent_unit_id : unit_id ? unit_id : "",
    ],
    (error, results) => {
      if (error) throw error;
      return res.status(201).send("Rental removed from favorites.");
    }
  );
};

module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};
