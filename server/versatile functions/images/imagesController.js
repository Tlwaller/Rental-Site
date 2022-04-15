const pool = require("../../db");
const queries = require("./imagesQueries");
const parentUnitQueries = require("../../parent_unit/parentUnitQueries");
const unitQueries = require("../../unit/unitQueries");

const getImages = (req, res) => {
  const { parent_unit_id, unit_id } = req.params;

  if (parent_unit_id) {
    pool.query(
      queries.getParentUnitImages,
      [parent_unit_id],
      (error, results) => {
        if (error) throw error;
        res.status(201).send(results.rows);
      }
    );
  } else if (unit_id) {
    pool.query(queries.getUnitImages, [unit_id], (error, results) => {
      if (error) throw error;
      res.status(201).send(results.rows);
    });
  }
};

const addImages = (req, res) => {
  const { parent_unit_id, unit_id } = req.params;
  const { image_urls } = req.body;

  if (parent_unit_id) {
    pool.query(
      parentUnitQueries.getParentUnitById,
      [parent_unit_id],
      (error, results) => {
        if (error) throw error;
        if (results.rows.length < 1) {
          res.status(201).send("Listing does not exist in the database");
        } else {
          image_urls.map((image) => {
            pool.query(queries.addParentUnitImages, [parent_unit_id, image]);
          });
          res.status(201).send("Successfully added images");
        }
      }
    );
  } else if (unit_id) {
    pool.query(unitQueries.getUnitById, [unit_id], (error, results) => {
      if (error) throw error;
      if (results.rows.length < 1) {
        res.status(201).send("Unit does not exist in the database");
      } else {
        image_urls.map((image) => {
          pool.query(queries.addUnitImages, [unit_id, image]);
        });
        res.status(201).send("Successfully added images");
      }
    });
  }
};

const editImage = (req, res) => {
  const { parent_unit_id, unit_id, image_id } = req.params;
  const { image_url } = req.body;
  let query;

  if (parent_unit_id) {
    query = queries.editParentUnitImage;
  } else if (unit_id) {
    query = queries.editUnitImage;
  }

  pool.query(query, [image_id, image_url], (error, results) => {
    if (error) throw error;
    res.status(201).send("Successfully changed image URL");
  });
};

const deleteImage = (req, res) => {
  const { parent_unit_id, unit_id, image_id } = req.params;
  let query;

  if (parent_unit_id) {
    query = queries.deleteParentUnitImage;
  } else if (unit_id) {
    query = queries.deleteUnitImage;
  }
  pool.query(query, [image_id], (error, results) => {
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
