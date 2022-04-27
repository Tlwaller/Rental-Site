const getUnits = `SELECT * FROM unit WHERE parent_unit_id = $1;`;
const getUnitById = `SELECT * FROM unit WHERE id = $1;`;
const addUnit = `
  INSERT INTO
  unit (
    parent_unit_id,
    unit_heading,
    unit_type,
    number_of_bedroom,
    number_of_bathroom,
    number_of_balcony,
    date_of_posting,
    date_available_from,
    leasor_id,
    is_active,
    unit_description,
    carpet_area,
    unit_number,
    unit_floor_number
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
const editUnit = `
  UPDATE unit SET 
    parent_unit_id = $2,
    unit_heading = $3,
    unit_type = $4,
    number_of_bedroom = $5,
    number_of_bathroom = $6,
    number_of_balcony = $7,
    date_of_posting = $8,
    date_available_from = $9,
    leasor_id = $10,
    is_active = $11,
    unit_description = $12,
    carpet_area = $13,
    unit_number = $14,
    unit_floor_number = $15
    WHERE id = $1;`;
const deleteUnit = "DELETE FROM unit WHERE id = $1";

module.exports = {
  getUnits,
  getUnitById,
  addUnit,
  editUnit,
  deleteUnit,
};
