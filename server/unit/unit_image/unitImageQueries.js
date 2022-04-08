const getImages = `SELECT * FROM unit_image WHERE unit_id = $1;`;
const addImages = `INSERT INTO unit_image (unit_id, image_url) VALUES($1, $2);`;
const editImage = `UPDATE unit_image SET image_url = $2 WHERE id = $1;`;
const deleteImage = `DELETE FROM unit_image WHERE id = $1;`;

module.exports = {
  getImages,
  addImages,
  editImage,
  deleteImage,
};
