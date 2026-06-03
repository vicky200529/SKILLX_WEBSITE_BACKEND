const { body } = require("express-validator");

const updateProfileValidator = [
  body("fullName")
    .trim()
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be 2-100 characters"),
  body("phone")
    .trim()
    .optional({ values: "falsy" })
    .matches(/^\+?[\d\s\-()]{7,20}$/)
    .withMessage("Please provide a valid phone number"),
  body("email")
    .trim()
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
];

module.exports = { updateProfileValidator };
