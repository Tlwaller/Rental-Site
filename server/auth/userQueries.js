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

module.exports = {
  getUser,
  createUser,
};
