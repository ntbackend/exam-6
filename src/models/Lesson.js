const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A lesson must have a title']
  },
  video: {
    type: String,
    required: [true, 'A lesson must have a video']
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: [true, 'A lesson must belong to a course']
  }
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
