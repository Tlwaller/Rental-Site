const getParentUnits = `SELECT * FROM parent_unit;`;
const getParentUnitById = `SELECT * FROM parent_unit WHERE id = $1;`;
const addParentUnit = `
  INSERT INTO
  parent_unit (
    parent_unit_name,
    total_floors,
    number_of_units,
    has_fitness_center,
    has_swimming_pool,
    has_laundry,
    has_wheelchair_accessibility,
    has_intercom_facility,
    has_power_backup,
    has_main_door_security,
    has_dog_park,
    verified,
    lifestyle,
    number_of_elevators,
    street_name,
    city_name,
    zip_code,
    phone,
    rent_range
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);`;
const editParentUnit = `
  UPDATE parent_unit SET 
    parent_unit_name = $2,
    total_floors = $3,
    number_of_units = $4,
    has_fitness_center = $5,
    has_swimming_pool = $6,
    has_laundry = $7,
    has_wheelchair_accessibility = $8,
    has_intercom_facility = $9,
    has_power_backup = $10,
    has_main_door_security = $11,
    has_dog_park = $12,
    verified = $13,
    lifestyle = $14,
    number_of_elevators = $15,
    street_name = $16,
    city_name = $17,
    zip_code = $18,
    phone = $19,
    rent_range = $20
    WHERE id = $1;`;
const deleteParentUnit = "DELETE FROM parent_unit WHERE id = $1";

module.exports = {
  getParentUnits,
  getParentUnitById,
  addParentUnit,
  editParentUnit,
  deleteParentUnit,
};
