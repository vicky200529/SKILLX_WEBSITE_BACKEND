const { Router } = require("express");
const analyticsController = require("../controllers/analyticsController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = Router();

router.use(authenticate);

router.get("/dashboard", analyticsController.getDashboard);

module.exports = router;
