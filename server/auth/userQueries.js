const getUser = `SELECT * FROM "user" WHERE username = $1;`;

const createUser = `
  INSERT INTO "user"(
    user_type,
    first_name,
    last_name,
    address,
    contact_number,
    email_address,
    username,
    password
    )
VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
`;

const editUserInfo = `
  UPDATE "user" SET
    user_type = $2,
    first_name = $3,
    last_name = $4,
    address = $5,
    contact_number = $6,
    email_address = $7,
    username = $8,
    password = $9
  WHERE id = $1
  RETURNING *;
`;

const deleteUser = `DELETE FROM "user" WHERE id = $1;`;

module.exports = {
  getUser,
  createUser,
  editUserInfo,
  deleteUser,
};
