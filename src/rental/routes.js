const { Router } = require("express");
const controller = require("./controller");

const router = Router();

router.get("/", controller.getRentals);
router.post("/", controller.addRental);
router.get("/:id", controller.getRentalById);
router.put("/:id", controller.editRental);
router.delete("/:id", controller.deleteRental);

module.exports = router;
