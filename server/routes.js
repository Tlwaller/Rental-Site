const { Router } = require("express");
const parentUnitController = require("./parent_unit/parentUnitController");
const amenitiesController = require("./parent_unit/additional_amenities/amenitiesController");
const accessibilityController = require("./parent_unit/parent_unit_accessibility/accessibilityController");

const leasingInfoController = require("./versatile functions/leasing_info/leasingInfoController");
const imagesController = require("./versatile functions/images/imagesController");

const unitController = require("./unit/unitController");

const router = Router();

//parent unit routes
router.get("/parent-units", parentUnitController.getParentUnits);
router.get("/parent-units/:id", parentUnitController.getParentUnitById);
router.post("/parent-units", parentUnitController.addParentUnit);
router.put("/parent-units/:id", parentUnitController.editParentUnit);
router.delete("/parent-units/:id", parentUnitController.deleteParentUnit);

//parent unit image routes
router.get("/parent-units/:parent_unit_id/images", imagesController.getImages);
router.post("/parent-units/images/:parent_unit_id", imagesController.addImages);
router.put(
  "/parent-units/:parent_unit_id/images/:image_id",
  imagesController.editImage
);
router.delete(
  "/parent-units/:parent_unit_id/images/:image_id",
  imagesController.deleteImage
);

//additional amenity routes
router.get(
  "/parent-units/:parent_unit_id/amenities",
  amenitiesController.getAmenities
);
router.post(
  "/parent-units/:parent_unit_id/amenities",
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
  "/parent-units/:parent_unit_id/accessibility",
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
router.get("/units/:unit_id/images", imagesController.getImages);
router.post("/units/:unit_id/images", imagesController.addImages);
router.put("/units/:unit_id/images/:image_id", imagesController.editImage);
router.delete("/units/:unit_id/images/:image_id", imagesController.deleteImage);

//leasing info routes

//this gets the leasing info of a single leasing i.e. houses
router.get(
  "/parent-units/:parent_unit_id/leasing-info",
  leasingInfoController.getLeasingInfoById
);
router.put(
  "/parent-units/:parent_unit_id/leasing-info",
  leasingInfoController.editLeasingInfo
);

//this gets the leasing info of an individual unit i.e. apartment floorplan
router.get(
  "/units/:unit_id/leasing-info",
  leasingInfoController.getLeasingInfoById
);
router.put(
  "/units/:unit_id/leasing-info",
  leasingInfoController.editLeasingInfo
);

module.exports = router;
