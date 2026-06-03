const { Router } = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const translationRoutes = require("./translationRoutes");
const historyRoutes = require("./historyRoutes");
const analyticsRoutes = require("./analyticsRoutes");

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/translations", translationRoutes);
router.use("/history", historyRoutes);
router.use("/analytics", analyticsRoutes);

module.exports = router;
