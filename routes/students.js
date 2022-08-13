const express = require("express");
const { update } = require("../models/student");
const router = express.Router();

const Student = require("../models/student");
// RESTful Endpoints
// GET, POST, PATCH, DELETE

const getStudent = async (req, res, next) => {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student === null) {
      return res.status(404).json({ message: `Student Not Found` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.student = student;
  next();
};

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ONE (by ID)
router.get("/:id", getStudent, async (req, res, next) => {
  res.json(res.student);
});

// POST
router.post("/", async (req, res, next) => {
  const student = new Student({
    name: req.body.name,
    class: req.body.class,
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH
router.patch("/:id", getStudent, async (req, res, next) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.class != null) {
    res.student.class = req.body.class;
  }
  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", getStudent, async (req, res, next) => {
  try {
    await res.student.remove();
    res.json({ message: `Removed student` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;