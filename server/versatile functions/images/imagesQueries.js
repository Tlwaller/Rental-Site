const getParentUnitImages = `SELECT * FROM parent_unit_image WHERE parent_unit_id = $1;`;
const addParentUnitImages = `INSERT INTO parent_unit_image (parent_unit_id, image_url) VALUES($1, $2);`;
const editParentUnitImage = `UPDATE parent_unit_image SET image_url = $2 WHERE id = $1;`;
const deleteParentUnitImage = `DELETE FROM parent_unit_image WHERE id = $1;`;

const getUnitImages = `SELECT * FROM unit_image WHERE unit_id = $1;`;
const addUnitImages = `INSERT INTO unit_image (unit_id, image_url) VALUES($1, $2);`;
const editUnitImage = `UPDATE unit_image SET image_url = $2 WHERE id = $1;`;
const deleteUnitImage = `DELETE FROM unit_image WHERE id = $1;`;

module.exports = {
  getParentUnitImages,
  addParentUnitImages,
  editParentUnitImage,
  deleteParentUnitImage,
  getUnitImages,
  addUnitImages,
  editUnitImage,
  deleteUnitImage,
};
