const pool = require("../../db");
const queries = require("./parentUnitImageQueries");
const parentUnitQueries = require("../parentUnitQueries");

const getImages = (req, res) => {
  pool.query(
    queries.getImages,
    [req.params.parent_unit_id],
    (error, results) => {
      if (error) throw error;
      res.status(201).send(results.rows);
    }
  );
};

const addImages = (req, res) => {
  const { parent_unit_id } = req.params;

  pool.query(
    parentUnitQueries.getParentUnitById,
    [parent_unit_id],
    (error, results) => {
      if (error) throw error;
      if (results.rows.length < 1) {
        res.status(201).send("Listing does not exist in the database");
      } else {
        req.body.image_urls.map((image) => {
          pool.query(queries.addImages, [parent_unit_id, image]);
        });
        res.status(201).send("Successfully added images");
      }
    }
  );
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
