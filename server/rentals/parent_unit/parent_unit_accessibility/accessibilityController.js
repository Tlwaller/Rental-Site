const pool = require("../../../db");
const queries = require("./accessibilityQueries");

const getAccessibilityById = (req, res) => {
  pool.query(
    queries.getAccessibilityById,
    [req.params.id],
    (error, results) => {
      if (error) throw error;
      if (results.rows[0]) {
        res.status(200).send(results.rows[0]);
      } else res.status(404).send("Accessibility not found in the database");
    }
  );
};

const addAccessibility = (req, res) => {
  const { params, body } = req;
  pool.query(
    queries.checkForExistingAccessibility,
    [params.parent_unit_id],
    (error, results) => {
      if (error) throw error;
      if (results.rows < 1) {
        pool.query(
          queries.addAccessibility,
          [
            params.parent_unit_id,
            body.school,
            body.childrenPark,
            body.bank,
            body.groceryStore,
            body.atm,
            body.subwayStation,
            body.busStop,
            body.airport,
          ],
          (error, results) => {
            if (error) throw error;
            res.status(201).send("Accessibility successfully added");
          }
        );
      } else res.status(409).send("Listing already has accessibilty.");
    }
  );
};

const editAccessibility = (req, res) => {
  const { params, body } = req;

  pool.query(queries.getAccessibilityById, [params.id], (error, results) => {
    if (error) throw error;
    if (results.rows.length > 0) {
      let newAccessibility = results.rows[0];
      for (e in newAccessibility) {
        if (body[e]) newAccessibility[e] = body[e];
      }
      pool.query(
        queries.editAccessibility,
        [
          params.id,
          newAccessibility.school,
          newAccessibility.children_park,
          newAccessibility.bank,
          newAccessibility.grocery_store,
          newAccessibility.atm,
          newAccessibility.subway_station,
          newAccessibility.bus_stop,
          newAccessibility.airport,
        ],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("Successfully updated accessibility");
        }
      );
    } else res.status(404).send("Accessibility not found in the database");
  });
};

const deleteAccessibility = (req, res) => {
  pool.query(queries.deleteAccessibility, [req.params.id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Successfully removed accessibility");
  });
};

module.exports = {
  getAccessibilityById,
  addAccessibility,
  editAccessibility,
  deleteAccessibility,
};
