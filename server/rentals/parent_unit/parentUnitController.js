const pool = require("../../db");
const parentQueries = require("./parentUnitQueries");
const unitQueries = require("../unit/unitQueries");
const leasingInfoQueries = require("../versatile functions/leasing_info/leasingInfoQueries");

const getParentUnits = (req, res) => {
  pool.query(parentQueries.getParentUnits, (error, results) => {
    if (error) throw error;
    res.status(200).send(results.rows);
  });
};

const getParentUnitById = (req, res) => {
  let listing = { parent_unit: {}, units: [] };
  if (isNaN(req.params.id)) {
    return res.sendStatus(400);
  }
  pool.query(
    parentQueries.getParentUnitById,
    [req.params.id],
    (error, results) => {
      if (error) throw error;
      if (results.rows < 1) {
        res.status(404).send("Listing not found in database.");
      } else {
        listing.parent_unit = results.rows[0];

        pool.query(unitQueries.getUnits, [req.params.id], (error, uResults) => {
          if (error) throw error;
          uResults.rows.map((e) => listing.units.push(e));
          if (listing.units.length < 1) {
            delete listing.units;
            pool.query(
              leasingInfoQueries.getParentUnitLeasingInfo,
              [req.params.id],
              (error, results) => {
                if (error) throw error;
                if (results.rows[0]) {
                  listing.leasing_info = results.rows[0];
                  res.status(200).send(listing);
                } else {
                  listing.message =
                    "WARNING: Listing has no leasing info or child units.";
                  res.status(200).send(listing);
                }
              }
            );
          } else res.status(200).send(listing);
        });
      }
    }
  );
};

const addParentUnit = (req, res) => {
  if (!req.session.user) {
    return res.status(403).send("Please sign in to submit a listing.");
  }
  const { parent_unit, units, leasing_info } = req.body;
  const addParentFirst = (cb) => {
    pool.query(
      parentQueries.addParentUnit,
      [
        parent_unit.parent_unit_name,
        req.session.user.id,
        parent_unit.total_floors,
        parent_unit.number_of_units,
        parent_unit.has_fitness_center,
        parent_unit.has_swimming_pool,
        parent_unit.has_laundry,
        parent_unit.has_wheelchair_accessibility,
        parent_unit.has_intercom_facility,
        parent_unit.has_power_backup,
        parent_unit.has_main_door_security,
        parent_unit.has_dog_park,
        parent_unit.verified,
        parent_unit.lifestyle,
        parent_unit.number_of_elevators,
        parent_unit.street_name,
        parent_unit.city_name,
        parent_unit.zip_code,
        parent_unit.phone,
        parent_unit.rent_range,
      ],
      (error, results) => {
        if (error) throw error;
        const parent_unit_id = results.rows[0].id;
        cb(parent_unit_id);
      }
    );
  };

  addParentFirst((parent_unit_id) => {
    if (units) {
      units.map((unit) => {
        pool.query(
          unitQueries.addUnit,
          [
            parent_unit_id,
            unit.unit_heading,
            unit.unit_type,
            unit.number_of_bedroom,
            unit.number_of_bathroom,
            unit.number_of_balcony,
            unit.date_of_posting,
            unit.date_available_from,
            req.session.user.id,
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
      res.status(201).send("Parent unit and units successfully created.");
    } else if (leasing_info) {
      pool.query(leasingInfoQueries.addParentUnitLeasingInfo, [
        parent_unit_id,
        leasing_info.leasing_type,
        leasing_info.is_sub_leasing_allowed,
        leasing_info.admin_fee,
        leasing_info.brokerage_fee,
        leasing_info.security_deposit,
        leasing_info.rent_for_short_term_leasing,
        leasing_info.rent_for_long_term_leasing,
        leasing_info.is_lease_termination_allowed,
        leasing_info.lease_termination_amount,
      ]);
      res.status(201).send("Listing successfully created.");
    } else
      res
        .status(201)
        .send("Please provide child units or leasing info for this listing.");
  });
};

const editParentUnit = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(404).send("Provided id is invalid.");
  } else {
    pool.query(parentQueries.getParentUnitById, [id], (error, results) => {
      if (error) throw error;
      if (results.rows.length < 1) {
        res.status(404).send("Listing does not exist in the database.");
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
            res.status(200).send("Rental successfully updated.");
          }
        );
      }
    });
  }
};

const deleteParentUnit = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(parentQueries.getParentUnitById, [id], (error, results) => {
    const noRentalFound = !results.rows.length;
    if (error) throw error;
    if (noRentalFound) {
      res.status(404).send("Rental does not exist in the database.");
    } else {
      pool.query(parentQueries.deleteParentUnit, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Rental successfully removed.");
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
