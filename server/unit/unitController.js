const pool = require("../db");
const queries = require("./unitQueries");
const leasingInfoQueries = require("../versatile functions/leasing_info/leasingInfoQueries");

const getUnitById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUnitById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addUnit = (req, res) => {
  pool.query(
    leasingInfoQueries.getParentUnitLeasingInfo,
    [req.body.parent_unit_id],
    (error, results) => {
      if (error) throw error;
      if (results.rows[0]) {
        res.status.send("Cannot append children to individual rentals.");
      } else {
        pool.query(
          queries.addUnit,
          [
            req.body.parent_unit_id,
            req.body.unit_heading,
            req.body.unit_type,
            req.body.number_of_bedroom,
            req.body.number_of_bathroom,
            req.body.number_of_balcony,
            req.body.leasing_info_id,
            req.body.date_of_posting,
            req.body.date_available_from,
            req.body.leasor_id,
            req.body.is_active,
            req.body.unit_description,
            req.body.carpet_area,
            req.body.unit_number,
            req.body.unit_floor_number,
          ],
          (error, results) => {
            if (error) throw error;
            res.status(201).send("Unit successfully created.");
          }
        );
      }
    }
  );
};

const editUnit = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getUnitById, [id], (error, results) => {
    if (error) throw error;
    if (results.rows.length < 1) {
      res.send("Unit does not exist in the database");
    } else {
      let listing = results.rows[0];
      for (let property in listing) {
        if (req.body[property]) listing[property] = req.body[property];
      }
      pool.query(
        queries.editUnit,
        [
          id,
          results.rows[0].parent_unit_id,
          listing.unit_heading,
          listing.unit_type,
          listing.number_of_bedroom,
          listing.number_of_bathroom,
          listing.number_of_balcony,
          listing.leasing_info_id,
          listing.date_of_posting,
          listing.date_available_from,
          listing.leasor_id,
          listing.is_active,
          listing.unit_description,
          listing.carpet_area,
          listing.unit_number,
          listing.unit_floor_number,
        ],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Unit successfully updated");
        }
      );
    }
  });
};

const deleteUnit = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getUnitById, [id], (error, results) => {
    const noRentalFound = !results.rows.length;
    if (error) throw error;
    if (noRentalFound) {
      res.send("Unit does not exist in the database");
    } else {
      pool.query(queries.deleteUnit, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Unit successfully removed");
      });
    }
  });
};

module.exports = {
  getUnitById,
  addUnit,
  editUnit,
  deleteUnit,
};
