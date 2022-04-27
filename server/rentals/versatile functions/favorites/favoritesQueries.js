const getFavorites = `
SELECT fpu.parent_unit_id, fu.unit_id
FROM favorited_parent_units fpu
INNER JOIN favorited_units fu
ON fpu.user_id = $1 AND fu.user_id = $1;
`;

const addFavorite = `INSERT INTO favorited_%Is (user_id, %I_id) VALUES ($1, $2);`;

module.exports = {
  getFavorites,
  addFavorite,
};
