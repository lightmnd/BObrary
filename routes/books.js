const router = require("express").Router();
const Book = require("../models/books");
const Author = require("../models/authors");

const path = require("path");
const uploadPath = path.join("public", Book.CoverImageBasePath);
const multer = require("multer");
const imagesMimeTypes = ["images/png", "images/jpeg", "images/gif"];

const upload = multer({
  dest: uploadPath,
  filterFile: (req, file, cb) => {
    cb(null, imagesMimeTypes.includes(file.mimeType));
  },
});

router.get("/", async (req, res) => {
  let searchOpt = {
    title: "",
    author: "",
  };
  if (
    (req.query.title !== null && req.query.title !== "") ||
    (req.query.author !== null && req.query.author !== "")
  ) {
    searchOpt.title = new RegExp(req.query.name, "i");
    searchOpt.author = new RegExp(req.query.name, "i");
  }
  try {
    console.log(">>searchOpt>>", searchOpt);
    const books = await Book.find();
    console.log(">>>>", books);
    res.render("books/index", {
      books: books,
      searchOpt: req.query,
    });
  } catch (error) {
    res.redirect("/");
  }
});

router.get("/new", async (req, res) => {
  try {
    const authors = await Author.find({});
    console.log(authors);
    const book = new Book();
    res.render("books/new", {
      authors: authors,
      book: book,
    });
  } catch (error) {
    res.redirect("books");
  }
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null;
  console.log("here body>>>", req.body);
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    publicationDate: new Date(req.body.publicationDate),
    pageCount: req.body.pageCount,
    coverImage: fileName,
  });
  try {
    const newBook = await book.save();
    res.redirect("/books"); // change it with res.redirect(`books`);
    console.log("here try");
  } catch (error) {
    res.render("books/new", {
      book: book, // to re-populate filed without manual retyping
      errorMessage: "Error creating book.",
    });
    console.log("here catch");
  }
  // console.log(book);
});

module.exports = router;
