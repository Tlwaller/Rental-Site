const getParentUnitLeasingInfo = `SELECT * FROM parent_unit_leasing_info WHERE parent_unit_id = $1`;
const getUnitLeasingInfo = `SELECT * FROM unit_leasing_info WHERE unit_id = $1`;

module.exports = {
  getParentUnitLeasingInfo,
  getUnitLeasingInfo,
};
