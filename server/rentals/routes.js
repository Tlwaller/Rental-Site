const { Router } = require("express");
const parentUnitController = require("./parent_unit/parentUnitController");
const amenitiesController = require("./parent_unit/additional_amenities/amenitiesController");
const accessibilityController = require("./parent_unit/parent_unit_accessibility/accessibilityController");
const unitController = require("./unit/unitController");

const leasingInfoController = require("./versatile functions/leasing_info/leasingInfoController");
const imagesController = require("./versatile functions/images/imagesController");
const featuresController = require("./versatile functions/features/featuresController");
const favoritesController = require("./versatile functions/favorites/favoritesController");

const router = Router();

//parent unit routes
router.get("/parent-units", parentUnitController.getParentUnits);
router.get("/parent-units/:id", parentUnitController.getParentUnitById);
router.post("/parent-units", parentUnitController.addParentUnit);
router.put("/parent-units/:id", parentUnitController.editParentUnit);
router.delete("/parent-units/:id", parentUnitController.deleteParentUnit);

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

//leasing info routes

//parent unit leasing info
router.get(
  "/parent-units/:parent_unit_id/leasing-info",
  leasingInfoController.getLeasingInfoById
);
router.put(
  "/parent-units/:parent_unit_id/leasing-info",
  leasingInfoController.editLeasingInfo
);

//unit leasing info
router.get(
  "/units/:unit_id/leasing-info",
  leasingInfoController.getLeasingInfoById
);
router.put(
  "/units/:unit_id/leasing-info",
  leasingInfoController.editLeasingInfo
);

//image routes

//parent unit images
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

//unit images
router.get("/units/:unit_id/images", imagesController.getImages);
router.post("/units/:unit_id/images", imagesController.addImages);
router.put("/units/:unit_id/images/:image_id", imagesController.editImage);
router.delete("/units/:unit_id/images/:image_id", imagesController.deleteImage);

//feature routes

//parent unit features
router.get(
  "/parent-units/filtered/:parent_unit_feature",
  featuresController.getListingsByFeature
);
router.put(
  "/parent-units/:parent_unit_id/features",
  featuresController.editFeature
);

//unit features
router.get(
  "/units/filtered/:unit_feature",
  featuresController.getListingsByFeature
);
router.put("/units/:unit_id/features", featuresController.editFeature);

//favorite routes
router.get("/favorites", favoritesController.getFavorites);

//favorite parent units
router.post(
  "/favorites/parent-units/:parent_unit_id",
  favoritesController.addFavorite
);
router.delete(
  "/favorites/parent-units/:parent_unit_id",
  favoritesController.deleteFavorite
);

//favorite units
router.post("/favorites/units/:unit_id", favoritesController.addFavorite);
router.delete("/favorites/units/:unit_id", favoritesController.deleteFavorite);

module.exports = router;
