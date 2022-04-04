const { json } = require("express");
const pool = require("./db");
const queries = require("./queries");

const getParentUnits = (req, res) => {
  pool.query(queries.getParentUnits, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getParentUnitById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getParentUnitById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addParentUnit = (req, res) => {
  pool.query(
    queries.addParentUnit,
    [
      req.body.parent_unit_name,
      req.body.total_floors,
      req.body.number_of_units,
      req.body.has_fitness_center,
      req.body.has_swimming_pool,
      req.body.has_laundry,
      req.body.has_wheelchair_accessibility,
      req.body.has_intercom_facility,
      req.body.has_power_backup,
      req.body.has_main_door_security,
      req.body.has_dog_park,
      req.body.verified,
      req.body.lifestyle,
      req.body.number_of_elevators,
      req.body.street_name,
      req.body.city_name,
      req.body.zip_code,
      req.body.phone,
      req.body.rent_range,
    ],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Rental successfully listed.");
    }
  );
};

const editParentUnit = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getParentUnitById, [id], (error, results) => {
    if (error) throw error;
    if (results.rows.length < 1) {
      res.send("Rental does not exist in the database");
    } else {
      let rental = results.rows[0];
      for (let property in rental) {
        if (req.body[property]) rental[property] = req.body[property];
      }
      pool.query(
        queries.editParentUnit,
        [
          id,
          rental.parent_unit_name,
          rental.total_floors,
          rental.number_of_units,
          rental.has_fitness_center,
          rental.has_swimming_pool,
          rental.has_laundry,
          rental.has_wheelchair_accessibility,
          rental.has_intercom_facility,
          rental.has_power_backup,
          rental.has_main_door_security,
          rental.has_dog_park,
          rental.verified,
          rental.lifestyle,
          rental.number_of_elevators,
          rental.street_name,
          rental.city_name,
          rental.zip_code,
          rental.phone,
          rental.rent_range,
        ],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Rental successfully updated");
        }
      );
    }
  });
};

const deleteParentUnit = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getParentUnitById, [id], (error, results) => {
    const noRentalFound = !results.rows.length;
    if (error) throw error;
    if (noRentalFound) {
      res.send("Rental does not exist in the database");
    } else {
      pool.query(queries.deleteParentUnit, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Rental successfully removed");
      });
    }
  });
};

module.exports = {
  getParentUnits,
  getParentUnitById,
  addParentUnit,
  editParentUnit,
  deleteParentUnit,
};
