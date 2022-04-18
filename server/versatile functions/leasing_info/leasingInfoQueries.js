const getParentUnitLeasingInfo = `SELECT * FROM parent_unit_leasing_info WHERE parent_unit_id = $1`;
const addParentUnitLeasingInfo = `
  INSERT INTO parent_unit_leasing_info (
    parent_unit_id,
    leasing_type,
    is_sub_leasing_allowed,
    admin_fee,
    brokerage_fee,
    security_deposit,
    rent_for_short_term_leasing,
    rent_for_long_term_leasing,
    is_lease_termination_allowed,
    lease_termination_amount
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
`;
const editParentUnitLeasingInfo = `
UPDATE parent_unit_leasing_info SET
leasing_type = $2,
is_sub_leasing_allowed = $3,
admin_fee = $4,
brokerage_fee = $5,
security_deposit = $6,
rent_for_short_term_leasing = $7,
rent_for_long_term_leasing = $8,
is_lease_termination_allowed = $9,
lease_termination_amount = $10
WHERE parent_unit_id = $1;
`;

const getUnitLeasingInfo = `SELECT * FROM unit_leasing_info WHERE unit_id = $1`;
const addUnitLeasingInfo = `
  INSERT INTO parent_unit_leasing_info (
    unit_id,
    leasing_type,
    is_sub_leasing_allowed,
    admin_fee,
    brokerage_fee,
    security_deposit,
    rent_for_short_term_leasing,
    rent_for_long_term_leasing,
    is_lease_termination_allowed,
    lease_termination_amount
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
`;
const editUnitLeasingInfo = `
UPDATE unit_leasing_info SET
leasing_type = $2,
is_sub_leasing_allowed = $3,
admin_fee = $4,
brokerage_fee = $5,
security_deposit = $6,
rent_for_short_term_leasing = $7,
rent_for_long_term_leasing = $8,
is_lease_termination_allowed = $9,
lease_termination_amount = $10
WHERE parent_unit_id = $1;
`;

module.exports = {
  getParentUnitLeasingInfo,
  addParentUnitLeasingInfo,
  editParentUnitLeasingInfo,
  getUnitLeasingInfo,
  addUnitLeasingInfo,
  editUnitLeasingInfo,
};
