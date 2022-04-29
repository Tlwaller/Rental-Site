const getFavorites = `
SELECT * FROM parent_unit pu
INNER JOIN favorited_rentals fr
ON pu.id = fr.parent_unit_id AND fr.user_id = $1;
`;

const addFavorite = `INSERT INTO favorited_rentals (user_id, parent_unit_id) VALUES ($1, $2);`;

const deleteFavorite = `DELETE FROM favorited_rentals WHERE parent_unit_id = $2 AND user_id = $1;`;

module.exports = {
  getFavorites,
  addFavorite,
  deleteFavorite,
};
