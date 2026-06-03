const { Router } = require("express");
const historyController = require("../controllers/historyController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = Router();

router.use(authenticate);

router.get("/", historyController.getAll);
router.delete("/:id", historyController.delete);

module.exports = router;
