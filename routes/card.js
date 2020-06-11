const { Router } = require("express");
const router = Router();

const Card = require("../models/card");
const Course = require("../models/course");

router.post("/add", async (req, res) => {
  const { id } = req.body;
  const course = await Course.getById(id);
  await Card.add(course);
  res.redirect("/card");
});

router.get("/", async (req, res) => {
  const card = await Card.fetch();
  const { courses, price } = card;
  res.render("card", {
    title: "Basket",
    isCard: true,
    courses,
    price,
  });
});

module.exports = router;
