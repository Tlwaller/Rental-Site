const pool = require("../../../db");
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

const editLeasingInfo = async (req, res) => {
  const { parent_unit_id, unit_id } = req.params;
  const newInfo = req.body;
  let leasing_info = {};

  if (!req.params) {
    return res.status(201).send("Please specify the leasing to edit.");
  } else if (parent_unit_id) {
    pool.query(
      queries.getParentUnitLeasingInfo,
      [parent_unit_id],
      (error, results) => {
        if (error) throw error;
        if (!results.rows[0]) {
          res.status(201).send("Leasing info not found in database.");
        } else {
          leasing_info = results.rows[0];
          for (let property in leasing_info) {
            if (newInfo[property]) leasing_info[property] = newInfo[property];
          }

          pool.query(
            queries.editParentUnitLeasingInfo,
            [
              leasing_info.parent_unit_id,
              leasing_info.leasing_type,
              leasing_info.is_sub_leasing_allowed,
              leasing_info.admin_fee,
              leasing_info.brokerage_fee,
              leasing_info.security_deposit,
              leasing_info.rent_for_short_term_leasing,
              leasing_info.rent_for_long_term_leasing,
              leasing_info.is_lease_termination_allowed,
              leasing_info.lease_termination_amount,
            ],
            (error, results) => {
              if (error) throw error;
              res.status(201).send("Successfully updated leasing info.");
            }
          );
        }
      }
    );
  } else if (unit_id) {
    pool.query(queries.getUnitLeasingInfo, [unit_id], (error, results) => {
      if (error) throw error;
      if (!results.rows[0]) {
        res.status(201).send("Unit leasing info not found in database.");
      } else {
        leasing_info = results.rows[0];
        for (let property in leasing_info) {
          if (newInfo[property]) leasing_info[property] = newInfo[property];
        }

        pool.query(
          queries.editUnitLeasingInfo,
          [
            leasing_info.unit_id,
            leasing_info.leasing_type,
            leasing_info.is_sub_leasing_allowed,
            leasing_info.admin_fee,
            leasing_info.brokerage_fee,
            leasing_info.security_deposit,
            leasing_info.rent_for_short_term_leasing,
            leasing_info.rent_for_long_term_leasing,
            leasing_info.is_lease_termination_allowed,
            leasing_info.lease_termination_amount,
          ],
          (error, results) => {
            if (error) throw error;
            res.status(201).send("Successfully updated unit leasing info.");
          }
        );
      }
    });
  }
};

module.exports = {
  getLeasingInfoById,
  editLeasingInfo,
};
