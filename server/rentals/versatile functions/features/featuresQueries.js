const getParentUnitsByFeature = `
SELECT parent_unit_name
FROM parent_unit
INNER JOIN parent_unit_feature
ON parent_unit.id = parent_unit_id
WHERE parent_unit_feature.%I = 'y';
`;

const getUnitsByFeature = `
SELECT
  parent_unit_name
FROM parent_unit par
  INNER JOIN unit un ON un.parent_unit_id = par.id
  INNER JOIN unit_feature uf ON uf.unit_id = un.id
WHERE uf.%I = 'y';
`;

const editFeature = `
UPDATE %I_feature SET
  num_of_assigned_car_parking = $2,
  is_air_conditioning = $3,
  has_carpet = $4,
  has_hardwood_flooring = $5,
  is_ceiling_fan_cooling = $6,
  is_central_heating = $7,
  has_in_unit_fireplace = $8,
  has_in_unit_garden = $9,
  has_in_unit_laundry = $10,
  has_walkin_closet = $11,
  are_pets_allowed = $12
WHERE %I_id = $1
`;

module.exports = {
  getParentUnitsByFeature,
  getUnitsByFeature,
  editFeature,
};
