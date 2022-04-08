const pool = require("../../db");
const queries = require("./unitImageQueries");
const unitQueries = require("../unitQueries");

const getImages = (req, res) => {
  pool.query(queries.getImages, [req.params.unit_id], (error, results) => {
    if (error) throw error;
    res.status(201).send(results.rows);
  });
};

const addImages = (req, res) => {
  const { unit_id, images } = req.body;

  pool.query(unitQueries.getUnitById, [unit_id], (error, results) => {
    if (error) throw error;
    if (results.rows.length < 1) {
      res.status(201).send("Unit does not exist in the database");
    } else {
      images.map((image) => {
        pool.query(queries.addImages, [unit_id, image]);
      });
      res.status(201).send("Successfully added images");
    }
  });
};

const editImage = (req, res) => {
  pool.query(
    queries.editImage,
    [req.params.id, req.body.image_url],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Successfully changed image URL");
    }
  );
};

const deleteImage = (req, res) => {
  pool.query(queries.deleteImage, [req.params.id], (error, results) => {
    if (error) throw error;
    res.status(201).send("Successfully removed image from database");
  });
};

module.exports = {
  getImages,
  addImages,
  editImage,
  deleteImage,
};
