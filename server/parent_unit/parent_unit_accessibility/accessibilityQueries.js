const getAccessibilityById = `SELECT * FROM parent_unit_accessibility WHERE id = $1;`;
const checkForExistingAccessibility = `SELECT * FROM parent_unit_accessibility WHERE parent_unit_id = $1;`;
const addAccessibility = `INSERT INTO parent_unit_accessibility (
    parent_unit_id,
    school,
    children_park,
    bank,
    grocery_store,
    atm,
    subway_station,
    bus_stop,
    airport
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
const editAccessibility = `UPDATE parent_unit_accessibility SET
    school = $2,
    children_park = $3,
    bank = $4,
    grocery_store = $5,
    atm = $6,
    subway_station = $7,
    bus_stop = $8,
    airport = $9
    WHERE id = $1;
`;
const deleteAccessibility = `DELETE FROM parent_unit_accessibility WHERE id = $1;`;

module.exports = {
  getAccessibilityById,
  checkForExistingAccessibility,
  addAccessibility,
  editAccessibility,
  deleteAccessibility,
};
