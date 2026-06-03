const { body } = require("express-validator");

const createTranslationValidator = [
  body("sourceLanguage")
    .trim()
    .notEmpty()
    .withMessage("Source language is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Source language must be 2-50 characters"),
  body("targetLanguage")
    .trim()
    .notEmpty()
    .withMessage("Target language is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Target language must be 2-50 characters"),
  body("sourceText")
    .trim()
    .notEmpty()
    .withMessage("Source text is required")
    .isLength({ min: 1, max: 5000 })
    .withMessage("Source text must be 1-5000 characters"),
  body("translatedText")
    .trim()
    .notEmpty()
    .withMessage("Translated text is required")
    .isLength({ min: 1, max: 5000 })
    .withMessage("Translated text must be 1-5000 characters"),
];

module.exports = { createTranslationValidator };
