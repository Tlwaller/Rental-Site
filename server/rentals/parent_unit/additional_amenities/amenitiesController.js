const pool = require("../../../db");
const queries = require("./amenitiesQueries");

const getAmenities = (req, res) => {
  pool.query(
    queries.getAmenities,
    [req.params.parent_unit_id],
    (error, results) => {
      if (results.rows < 1) {
        res.status(201).send("No additional amenities found");
      } else if (error) {
        throw error;
      } else res.status(201).send(results.rows[0]);
    }
  );
};

const addAmenities = (req, res) => {
  let amenitiesString = "";

  req.body.map((e, i) => {
    if (i + 1 == req.body.length) {
      amenitiesString += `('${req.params.parent_unit_id}', '${e}')`;
    } else amenitiesString += `('${req.params.parent_unit_id}', '${e}'), `;
  });

  pool.query(
    `INSERT INTO additional_amenities (parent_unit_id, amenity_type) VALUES ${amenitiesString};`,
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Successfully added amenities");
    }
  );
};

const editAmenity = (req, res) => {
  pool.query(
    queries.editAmenity,
    [req.params.id, req.body.newAmenity],
    (error, results) => {
      if (error) throw error;
      res.status(201).send("Successfully changed amenity");
    }
  );
};

const deleteAmenity = (req, res) => {
  pool.query(queries.deleteAmenity, [req.params.id], (error, results) => {
    if (error) throw error;
    res.status(201).send("Successfully removed amenity");
  });
};

module.exports = {
  getAmenities,
  addAmenities,
  editAmenity,
  deleteAmenity,
};
