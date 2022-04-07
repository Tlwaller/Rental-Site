const pool = require("../../db");
const queries = require("./parentUnitImageQueries");
const parentUnitQueries = require("../parentUnitQueries");

const getImages = (req, res) => {
  pool.query(queries.getImages, [req.params.parentUnitId], (error, results) => {
    if (error) throw error;
    res.status(201).send(results.rows);
  });
};

const addImages = (req, res) => {
  const { parentUnitId, images } = req.body;

  pool.query(
    parentUnitQueries.getParentUnitById,
    [parentUnitId],
    (error, results) => {
      if (error) throw error;
      if (results.rows.length < 1) {
        res.status(201).send("Listing does not exist in the database");
      } else {
        images.map((image) => {
          pool.query(queries.addImages, [parentUnitId, image]);
        });
        res.status(201).send("Successfully added images");
      }
    }
  );
};

const editImage = (req, res) => {
  pool.query(
    queries.editImage,
    [req.params.id, req.body.newUrl],
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
