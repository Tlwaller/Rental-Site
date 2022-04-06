const { json } = require("express");
const pool = require("../db");
const parentQueries = require("./queries");
const unitQueries = require("../unit/queries");

const getParentUnits = (req, res) => {
  pool.query(parentQueries.getParentUnits, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getParentUnitById = (req, res) => {
  const id = parseInt(req.params.id);
  let listing = { complex: {}, floorPlans: [] };
  pool.query(parentQueries.getParentUnitById, [id], (error, pResults) => {
    if (error) throw error;
    listing.complex = pResults.rows[0];

    pool.query(unitQueries.getUnits, [id], (error, uResults) => {
      if (error) throw error;
      uResults.rows.map((e) => listing.floorPlans.push(e));
      res.status(200).json(listing);
    });
  });
};

const addParentUnit = (req, res) => {
  const { complex, floorPlans } = req.body;
  pool.query(
    parentQueries.addParentUnit,
    [
      complex.parent_unit_name,
      complex.total_floors,
      complex.number_of_units,
      complex.has_fitness_center,
      complex.has_swimming_pool,
      complex.has_laundry,
      complex.has_wheelchair_accessibility,
      complex.has_intercom_facility,
      complex.has_power_backup,
      complex.has_main_door_security,
      complex.has_dog_park,
      complex.verified,
      complex.lifestyle,
      complex.number_of_elevators,
      complex.street_name,
      complex.city_name,
      complex.zip_code,
      complex.phone,
      complex.rent_range,
    ],
    (error, results) => {
      if (error) throw error;
    }
  );

  if (floorPlans) {
    let parentUnitId = 0;
    pool.query(parentQueries.getNextId, (error, results) => {
      if (error) throw error;
      parentUnitId = results.rows[0].id + 1;
      floorPlans.map((unit) => {
        pool.query(
          unitQueries.addUnit,
          [
            parentUnitId,
            unit.unit_heading,
            unit.unit_type,
            unit.number_of_bedroom,
            unit.number_of_bathroom,
            unit.number_of_balcony,
            unit.leasing_info_id,
            unit.date_of_posting,
            unit.date_available_from,
            unit.leasor_id,
            unit.is_active,
            unit.unit_description,
            unit.carpet_area,
            unit.unit_number,
            unit.unit_floor_number,
          ],
          (error, results) => {
            if (error) throw error;
          }
        );
      });
    });
    res.status(201).send("Complex and floorplans successfully created.");
  } else res.status(201).send("Listing successfully created.");
};

const editParentUnit = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(parentQueries.getParentUnitById, [id], (error, results) => {
    if (error) throw error;
    if (results.rows.length < 1) {
      res.send(" does not exist in the database");
    } else {
      let rental = results.rows[0];
      for (let property in rental) {
        if (req.body[property]) rental[property] = req.body[property];
      }
      pool.query(
        parentQueries.editParentUnit,
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
  pool.query(parentQueries.getParentUnitById, [id], (error, results) => {
    const noRentalFound = !results.rows.length;
    if (error) throw error;
    if (noRentalFound) {
      res.send("Rental does not exist in the database");
    } else {
      pool.query(parentQueries.deleteParentUnit, [id], (error, results) => {
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
