const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getParentUnits);
router.post("/", controller.addParentUnit);
router.get("/:id", controller.getParentUnitById);
router.put("/:id", controller.editParentUnit);
router.delete("/:id", controller.deleteParentUnit);

module.exports = router;
