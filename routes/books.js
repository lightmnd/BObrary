const router = require("express").Router();
const Book = require("../models/books");
const Author = require("../models/authors");

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
  const authors = await Author.find({});
  const book = new Book();
  try {
    res.render("books/new", { authors: authors, book: book });
  } catch (error) {
    res.redirect("books");
  }
});

router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    author: "",
    publicationDate: new Date(req.body.publicationDate),
    pageCount: req.body.pageCount,
    coverImage: req.body.title,
  });
  console.log(req.body.publicationDate);
  try {
    const newBook = await book.save();
    console.log("newBook", newBook);
    res.redirect(`authors`); // change it with res.redirect(`books`);
  } catch (error) {
    res.render("books/new", {
      book: book, // to re-populate filed without manual retyping
      errorMessage: "Error creating book.",
    });
  }
  // console.log(book);
});

module.exports = router;
