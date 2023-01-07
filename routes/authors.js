const router = require("express").Router();
const authors = require("../models/authors");
const Author = require("../models/authors");

router.get("/", async (req, res) => {
  let searchOpt = {};
  if (req.query.name !== null || terminareq.query.name !== "") {
    searchOpt.name = new RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOpt);
    console.log("authors", authors);
    res.render("authors/index", {
      authors: authors,
      searchOpt: req.query,
    });
  } catch (error) {
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
    // lastName: req.body.lastName,
  });
  try {
    const newAuthor = await author.save();
    res.redirect(`authors`);
  } catch (error) {
    res.render("authors/new", {
      author: author, // to re-populate filed without manual retyping
      errorMessage: "Error creating author.",
    });
  }
});

module.exports = router;
