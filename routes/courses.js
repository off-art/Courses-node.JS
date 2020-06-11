const { Router } = require("express");
const router = Router();
const Courses = require("../models/course");

router.get("/", async (req, res) => {
  const db = await Courses.getAll();
  res.render("courses", {
    title: "Сourses",
    isCourses: true,
    db,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const { id } = req.params;
  const course = await Courses.getById(id);

  res.render("editCourse", {
    title: `Редактировать ${course.title}`,
    course,
  });
});

router.post("/edit", async (req, res) => {
  await Courses.update(req.body);
  res.redirect("/courses");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const course = await Courses.getById(id);
  res.render("course", {
    course,
  });
});

module.exports = router;
