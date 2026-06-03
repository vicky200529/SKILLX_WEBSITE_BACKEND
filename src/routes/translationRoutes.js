const { Router } = require("express");
const translationController = require("../controllers/translationController");
const { authenticate } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { createTranslationValidator } = require("../validators/translationValidator");

const router = Router();

router.use(authenticate);

router.post("/", createTranslationValidator, validate, translationController.create);
router.get("/", translationController.getAll);
router.get("/:id", translationController.getById);
router.delete("/:id", translationController.delete);

module.exports = router;
