const pool = require("../../db");
const queries = require("./leasingInfoQueries");

const getLeasingInfoById = (req, res) => {
  const { parent_unit_id, unit_id } = req.params;
  if (parent_unit_id) {
    pool.query(
      queries.getParentUnitLeasingInfo,
      [parent_unit_id],
      (error, results) => {
        if (error) throw error;
        if (results.rows.length < 1) {
          res.status(201).send("parent unit not found in database");
        } else res.status(201).send(results.rows[0]);
      }
    );
  } else if (unit_id) {
    pool.query(queries.getUnitLeasingInfo, [unit_id], (error, results) => {
      if (error) throw error;
      if (results.rows.length < 1) {
        res.status(201).send("unit not found in database");
      } else res.status(201).send(results.rows[0]);
    });
  } else res.status(201).send("no unit or parent unit specified");
};

module.exports = {
  getLeasingInfoById,
};
