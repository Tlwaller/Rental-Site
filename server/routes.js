const { Router } = require("express");
const parentUnitController = require("./parent_unit/controller");
const unitController = require("./unit/controller");

const router = Router();

//parent unit routes
router.get("/parent-units", parentUnitController.getParentUnits);
router.get("/parent-units/:id", parentUnitController.getParentUnitById);
router.post("/parent-units", parentUnitController.addParentUnit);
router.put("/parent-units/:id", parentUnitController.editParentUnit);
router.delete("/parent-units/:id", parentUnitController.deleteParentUnit);

//individual unit routes
router.get("/units/:id", unitController.getUnitById);
router.post("/units", unitController.addUnit);
router.put("/units/:id", unitController.editUnit);
router.delete("/units/:id", unitController.deleteUnit);

module.exports = router;
