const { Router } = require("express");
const userController = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { updateProfileValidator } = require("../validators/userValidator");

const router = Router();

router.use(authenticate);

router.get("/profile", userController.getProfile);
router.put("/profile", updateProfileValidator, validate, userController.updateProfile);
router.delete("/profile", userController.deleteProfile);

module.exports = router;
