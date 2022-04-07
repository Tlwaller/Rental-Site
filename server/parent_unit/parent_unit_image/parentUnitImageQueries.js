const getImages = `SELECT * FROM parent_unit_image WHERE parent_unit_id = $1;`;
const addImages = `INSERT INTO parent_unit_image (parent_unit_id, image_url) VALUES($1, $2);`;
const editImage = `UPDATE parent_unit_image SET image_url = $2 WHERE id = $1;`;
const deleteImage = `DELETE FROM parent_unit_image WHERE id = $1;`;

module.exports = {
  getImages,
  addImages,
  editImage,
  deleteImage,
};
