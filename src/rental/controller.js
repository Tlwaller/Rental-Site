const { json } = require("express");
const pool = require("../../db");
const queries = require("./queries");

const getRentals = (req, res) => {
  pool.query(queries.getRentals, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getRentalById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getRentalById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addRental = (req, res) => {
  const { title, price, location, size, bed, bath } = req.body;

  pool.query(
    queries.addRental,
    [title, price, location, size, bed, bath],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Rental successfully created");
    }
  );
};

const editRental = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getRentalById, [id], (error, results) => {
    if (error) throw error;
    if (results.rows.length < 1) {
      res.send("Rental does not exist in the database");
    } else {
      let rental = results.rows[0];
      for (let property in rental) {
        if (req.body[property]) rental[property] = req.body[property];
      }
      pool.query(
        queries.editRental,
        [
          id,
          rental.title,
          rental.price,
          rental.location,
          rental.size,
          rental.bed,
          rental.bath,
        ],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Rental successfully updated");
        }
      );
    }
  });
};

const deleteRental = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getRentalById, [id], (error, results) => {
    const noRentalFound = !results.rows.length;
    if (error) throw error;
    if (noRentalFound) {
      res.send("Rental does not exist in the database");
    } else {
      pool.query(queries.deleteRental, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("Rental successfully removed");
      });
    }
  });
};

module.exports = {
  getRentals,
  getRentalById,
  addRental,
  editRental,
  deleteRental,
};
