const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

exports.getByIdLessons = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { lesson } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json({
      status: 'success',
      results: lessons.length,
      data: {
        lessons
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.createLesson = async (req, res) => {
  try {
    const { title, course } = req.body;
    const video = req.file.path;

    const newLesson = await Lesson.create({ title, video, course });

    const courseDoc = await Course.findById(course);
    courseDoc.lessonsCount += 1;
    await courseDoc.save();

    res.status(201).json({
      status: 'success',
      data: {
        lesson: newLesson
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates.video = req.file.path;
    }
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!lesson) {
      return res.status(404).json({
        status: 'fail',
        message: 'No lesson found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        lesson
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        status: 'fail',
        message: 'No lesson found with that ID'
      });
    }

    const courseDoc = await Course.findById(lesson.course);
    courseDoc.lessonsCount -= 1;
    await courseDoc.save();

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};
