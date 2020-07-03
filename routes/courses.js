const { Router } = require('express')
const router = Router()
const Courses = require('../models/course')

router.get('/', async (req, res) => {
  const db = await Courses.find().lean()
  res.render('courses', {
    title: 'Сourses',
    isCourses: true,
    db,
  })
})

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/')
  }
  const { id } = req.params
  const course = await Courses.findById(id).lean()
  res.render('editCourse', {
    title: `Редактировать ${course.title}`,
    course,
  })
})

router.post('/edit', async (req, res) => {
  const { id } = req.body
  delete req.body.id
  await Courses.findByIdAndUpdate(id, req.body).lean()
  res.redirect('/courses')
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const course = await Courses.findById(id).lean()

  res.render('course', {
    loyout: 'empty',
    title: `Course-${course.title}`,
    course,
  })
})

router.post('/remove', async (req, res) => {
  try {
    const { id } = req.body
    await Courses.deleteOne({
      _id: id
    })
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
