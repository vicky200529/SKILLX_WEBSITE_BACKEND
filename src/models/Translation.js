const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sourceLanguage: {
      type: String,
      required: [true, "Source language is required"],
      trim: true,
    },
    targetLanguage: {
      type: String,
      required: [true, "Target language is required"],
      trim: true,
    },
    sourceText: {
      type: String,
      required: [true, "Source text is required"],
    },
    translatedText: {
      type: String,
      required: [true, "Translated text is required"],
    },
    status: {
      type: String,
      enum: ["completed", "failed", "processing"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

translationSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Translation", translationSchema);
