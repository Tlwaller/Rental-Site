const { Router } = require("express");
const parentUnitController = require("./parent_unit/parentUnitController");
const parentUnitImageController = require("./parent_unit/parent_unit_image/parentUnitImageController");
const unitController = require("./unit/unitController");

const router = Router();

//parent unit routes
router.get("/parent-units", parentUnitController.getParentUnits);
router.get("/parent-units/:id", parentUnitController.getParentUnitById);
router.post("/parent-units", parentUnitController.addParentUnit);
router.put("/parent-units/:id", parentUnitController.editParentUnit);
router.delete("/parent-units/:id", parentUnitController.deleteParentUnit);

//parent unit image routes
router.get(
  "/parent-units/images/:parentUnitId",
  parentUnitImageController.getImages
);
router.post("/parent-units/images", parentUnitImageController.addImages);
router.put("/parent-units/images/:id", parentUnitImageController.editImage);
router.delete(
  "/parent-units/images/:id",
  parentUnitImageController.deleteImage
);

//individual unit routes
router.get("/units/:id", unitController.getUnitById);
router.post("/units", unitController.addUnit);
router.put("/units/:id", unitController.editUnit);
router.delete("/units/:id", unitController.deleteUnit);

module.exports = router;
