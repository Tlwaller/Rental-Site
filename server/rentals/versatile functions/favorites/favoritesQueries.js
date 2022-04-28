const getFavorites = `
SELECT fpu.parent_unit_id, fu.unit_id
FROM favorited_parent_units fpu
RIGHT JOIN favorited_units fu
ON fpu.user_id = $1 AND fu.user_id = $1;
`;

const checkRental = `SELECT * FROM %I WHERE id = $1`;

const addFavorite = `INSERT INTO favorited_%Is (user_id, %I_id) VALUES ($1, $2);`;

const deleteFavorite = `DELETE FROM favorited_%Is WHERE %I_id = $2 AND user_id = $1;`;

module.exports = {
  getFavorites,
  checkRental,
  addFavorite,
  deleteFavorite,
};
