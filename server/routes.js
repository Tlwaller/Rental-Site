const { Router } = require("express");
const parentUnitController = require("./parent_unit/parentUnitController");
const parentUnitImageController = require("./parent_unit/parent_unit_image/parentUnitImageController");
const amenitiesController = require("./parent_unit/additional_amenities/amenitiesController");
const accessibilityController = require("./parent_unit/parent_unit_accessibility/accessibilityController");

const leasingInfoController = require("./versatile functions/leasing_info/leasingInfoController");

const unitController = require("./unit/unitController");
const unitImageController = require("./unit/unit_image/unitImageController");

const router = Router();

//parent unit routes
router.get("/parent-units", parentUnitController.getParentUnits);
router.get("/parent-units/:id", parentUnitController.getParentUnitById);
router.post("/parent-units", parentUnitController.addParentUnit);
router.put("/parent-units/:id", parentUnitController.editParentUnit);
router.delete("/parent-units/:id", parentUnitController.deleteParentUnit);

//parent unit image routes
router.get(
  "/parent-units/images/:parent_unit_id",
  parentUnitImageController.getImages
);
router.post(
  "/parent-units/images/:parent_unit_id",
  parentUnitImageController.addImages
);
router.put("/parent-units/images/:id", parentUnitImageController.editImage);
router.delete(
  "/parent-units/images/:id",
  parentUnitImageController.deleteImage
);

//additional amenity routes
router.get(
  "/parent-units/amenities/:parentUnitId",
  amenitiesController.getAmenities
);
router.post(
  "/parent-units/amenities/:parentUnitId",
  amenitiesController.addAmenities
);
router.put("/parent-units/amenities/:id", amenitiesController.editAmenity);
router.delete("/parent-units/amenities/:id", amenitiesController.deleteAmenity);

//parent unit accessibility routes
router.get(
  "/parent-units/accessibility/:id",
  accessibilityController.getAccessibilityById
);
router.post(
  "/parent-units/accessibility/:parentUnitId",
  accessibilityController.addAccessibility
);
router.put(
  "/parent-units/accessibility/:id",
  accessibilityController.editAccessibility
);
router.delete(
  "/parent-units/accessibility/:id",
  accessibilityController.deleteAccessibility
);

//individual unit routes
router.get("/units/:id", unitController.getUnitById);
router.post("/units", unitController.addUnit);
router.put("/units/:id", unitController.editUnit);
router.delete("/units/:id", unitController.deleteUnit);

//unit image routes
router.get("/units/images/:unit_id", unitImageController.getImages);
router.post("/units/images/:unit_id", unitImageController.addImages);
router.put("/units/images/:id", unitImageController.editImage);
router.delete("/units/images/:id", unitImageController.deleteImage);

//leasing info routes

//this gets the leasing info of an single leasing i.e. houses
router.get(
  "/parent-units/leasing-info/:parent_unit_id",
  leasingInfoController.getLeasingInfoById
);

//this gets the leasing info of an individual unit i.e. apartment floorplan
router.get(
  "/units/leasing-info/:unit_id",
  leasingInfoController.getLeasingInfoById
);

module.exports = router;
