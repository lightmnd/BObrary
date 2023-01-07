const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
    publicationDate: {
      type: Date,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { timestamps }
);

module.exports = mongoose.model("Book", bookSchema);
