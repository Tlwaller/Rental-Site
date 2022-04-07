const getAmenities = `SELECT * FROM additional_amenities WHERE parent_unit_id = $1;`;
const editAmenity = `UPDATE additional_amenities SET amenity_type = $2 WHERE id = $1;`;
const deleteAmenity = `DELETE FROM additional_amenities WHERE id = $1;`;

module.exports = {
  getAmenities,
  editAmenity,
  deleteAmenity,
};
