const getRentals = "SELECT * FROM rentals";
const getRentalById = "SELECT * FROM rentals WHERE id = $1";
const addRental =
  "INSERT INTO rentals (title, price, location, size, bed, bath) VALUES ($1, $2, $3, $4, $5, $6)";
const editRental =
  "UPDATE rentals SET title = $2, price = $3, location = $4, size = $5, bed = $6, bath = $7 WHERE id = $1";
const deleteRental = "DELETE FROM rentals WHERE id = $1";

module.exports = {
  getRentals,
  getRentalById,
  addRental,
  editRental,
  deleteRental,
};
