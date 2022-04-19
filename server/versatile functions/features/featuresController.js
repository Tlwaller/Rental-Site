const pool = require("../../db");
const format = require("pg-format");
const queries = require("./featuresQueries");

const getListingsByFeature = (req, res) => {
  //both actually need to execute
  const { parent_unit_feature, unit_feature } = req.params;
  let sql;

  if (parent_unit_feature) {
    sql = format(queries.getParentUnitsByFeature, parent_unit_feature);
  } else if (unit_feature) {
    sql = format(queries.getUnitsByFeature, unit_feature);
  }
  pool.query(sql, [], (error, results) => {
    if (error) throw error;
    res.status(201).send(results.rows[0]);
  });
};

const editFeature = (req, res) => {
  const { parent_unit_id, unit_id } = req.params;
  const newFeats = req.body;

  let unitType = parent_unit_id ? "parent_unit" : unit_id ? "unit" : "";

  pool.query(
    format(`SELECT * FROM %I_feature WHERE %I_id = $1`, unitType, unitType),
    [parent_unit_id ? parent_unit_id : unit_id],
    (error, results) => {
      if (error) throw error;
      if (results.rows[0]) {
        features = results.rows[0];
        for (let feat in features) {
          if (newFeats[feat]) features[feat] = newFeats[feat];
        }
        pool.query(
          format(queries.editFeature, unitType, unitType),
          [
            parent_unit_id ? parent_unit_id : unit_id,
            features.furnishing_type,
            features.num_of_assigned_car_parking,
            features.is_air_conditioning,
            features.has_carpet,
            features.has_hardwood_flooring,
            features.is_ceiling_fan_cooling,
            features.is_central_heating,
            features.has_in_unit_fireplace,
            features.has_in_unit_garden,
            features.has_in_unit_laundry,
            features.has_walkin_closet,
            features.are_pets_allowed,
          ],
          (error, results) => {
            if (error) throw error;
            res.status(201).send("Successfully updated feature.");
          }
        );
      }
    }
  );
};

module.exports = {
  getListingsByFeature,
  editFeature,
};
