const format = require("pg-format");
const pool = require("../../../db");
const queries = require("./favoritesQueries");
const rentalQueries = require("../../parent_unit/parentUnitQueries");

const getFavorites = (req, res) => {
  if (!req.session.user) {
    return res
      .status(403)
      .send("Please sign in to view your favorited listings.");
  }

  pool.query(queries.getFavorites, [req.session.user.id], (error, results) => {
    if (error) throw error;
    res.status(200).send(results.rows);
  });
};

const addFavorite = (req, res) => {
  if (!req.session.user) {
    return res
      .status(403)
      .send("Please sign in or register to add this rental to your favorites.");
  }
  const { parent_unit_id } = req.params;

  pool.query(
    rentalQueries.getParentUnitById,
    [parent_unit_id],
    (error, results) => {
      if (error) throw error;
      if (results.rows[0]) {
        pool.query(
          queries.addFavorite,
          [req.session.user.id, parent_unit_id],
          (error, results) => {
            if (error) throw error;
            return res.status(201).send("Rental added to favorites.");
          }
        );
      } else {
        return res.status(404).send("Rental not found in database.");
      }
    }
  );
};

const deleteFavorite = (req, res) => {
  if (!req.session.user) {
    return res
      .status(403)
      .send(
        "Please sign in or register to remove this rental from your favorites."
      );
  }

  pool.query(
    queries.deleteFavorite,
    [req.session.user.id, req.params.parent_unit_id],
    (error, results) => {
      if (error) throw error;
      return res.status(200).send("Rental removed from favorites.");
    }
  );
};

module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};
