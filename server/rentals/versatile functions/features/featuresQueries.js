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

const checkFeature = `SELECT * FROM %I_feature WHERE %I_id = $1;`;

const addParentUnitFeature = `
INSERT INTO parent_unit_feature (
  parent_unit_id,
  is_air_conditioning,
  has_carpet,
  has_hardwood_flooring,
  is_ceiling_fan_cooling,
  is_central_heating,
  has_in_unit_fireplace,
  has_in_unit_garden,
  has_in_unit_laundry,
  has_walkin_closet
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
`;

const addUnitFeature = `
INSERT INTO unit_feature (
  unit_id,
  num_of_assigned_car_parking,
  is_air_conditioning,
  has_carpet,
  has_hardwood_flooring,
  is_ceiling_fan_cooling,
  is_central_heating,
  has_in_unit_fireplace,
  has_in_unit_garden,
  has_in_unit_laundry,
  has_walkin_closet,
  are_pets_allowed
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
`;

const editParentUnitFeature = `
UPDATE parent_unit_feature SET
  is_air_conditioning = $2,
  has_carpet = $3,
  has_hardwood_flooring = $4,
  is_ceiling_fan_cooling = $5,
  is_central_heating = $6,
  has_in_unit_fireplace = $7,
  has_in_unit_garden = $8,
  has_in_unit_laundry = $9,
  has_walkin_closet = $10
WHERE parent_unit_id = $1;
`;

const editUnitFeature = `
UPDATE unit_feature SET
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
WHERE unit_id = $1;
`;

module.exports = {
  getParentUnitsByFeature,
  getUnitsByFeature,
  checkFeature,
  addParentUnitFeature,
  addUnitFeature,
  editParentUnitFeature,
  editUnitFeature,
};
