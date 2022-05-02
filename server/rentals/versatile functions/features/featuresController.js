const pool = require("../../../db");
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
  } else return res.status(400);

  pool.query(sql, [], (error, results) => {
    if (error) throw error;
    res.status(200).send(results.rows[0]);
  });
};

const addFeature = (req, res) => {
  const { parent_unit_id, unit_id } = req.params;
  let unitType = parent_unit_id ? "parent_unit" : unit_id ? "unit" : "";

  pool.query(
    format(queries.checkFeature, unitType, unitType),
    [parent_unit_id ? parent_unit_id : unit_id],
    (error, results) => {
      if (error) throw error;
      if (results.rows[0]) {
        return res.status(409).send("This listing already has features.");
      } else {
        if (unitType === "parent_unit") {
          pool.query(queries.addParentUnitFeature, [
            parent_unit_id,
            req.body.is_air_conditioning,
            req.body.has_carpet,
            req.body.has_hardwood_flooring,
            req.body.is_ceiling_fan_cooling,
            req.body.is_central_heating,
            req.body.has_in_unit_fireplace,
            req.body.has_in_unit_garden,
            req.body.has_in_unit_laundry,
            req.body.has_walkin_closet,
          ]);
          return res.status(201).send("Features added to parent unit.");
        } else if (unitType === "unit") {
          pool.query(queries.addUnitFeature, [
            unit_id,
            req.body.num_of_assigned_car_parking,
            req.body.is_air_conditioning,
            req.body.has_carpet,
            req.body.has_hardwood_flooring,
            req.body.is_ceiling_fan_cooling,
            req.body.is_central_heating,
            req.body.has_in_unit_fireplace,
            req.body.has_in_unit_garden,
            req.body.has_in_unit_laundry,
            req.body.has_walkin_closet,
            req.body.are_pets_allowed,
          ]);
          return res.status(201).send("Features added to unit.");
        } else return res.status(400).send("Invalid id provided");
      }
    }
  );
};

const editFeature = (req, res) => {
  const { parent_unit_id, unit_id } = req.params;
  const newFeats = req.body;

  let unitType = parent_unit_id ? "parent_unit" : unit_id ? "unit" : "";

  pool.query(
    format(queries.checkFeature, unitType, unitType),
    [parent_unit_id ? parent_unit_id : unit_id],
    (error, results) => {
      if (error) throw error;
      if (results.rows[0]) {
        features = results.rows[0];
        for (let feat in features) {
          if (newFeats[feat]) features[feat] = newFeats[feat];
        }
        parent_unit_id
          ? pool.query(
              format(queries.editParentUnitFeature, unitType, unitType),
              [
                parent_unit_id,
                features.is_air_conditioning,
                features.has_carpet,
                features.has_hardwood_flooring,
                features.is_ceiling_fan_cooling,
                features.is_central_heating,
                features.has_in_unit_fireplace,
                features.has_in_unit_garden,
                features.has_in_unit_laundry,
                features.has_walkin_closet,
              ],
              (error, results) => {
                if (error) throw error;
                res.status(200).send("Successfully updated feature.");
              }
            )
          : pool.query(
              format(queries.editUnitFeature, unitType, unitType),
              [
                unit_id,
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
                res.status(200).send("Successfully updated feature.");
              }
            );
      } else
        return res.status(404).send("No features were found for that listing.");
    }
  );
};

module.exports = {
  getListingsByFeature,
  addFeature,
  editFeature,
};
