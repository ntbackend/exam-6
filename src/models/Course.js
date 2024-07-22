const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  lessonsCount: { type: Number, default: 0 }
});

courseSchema.methods.updateLessonsCount = async function () {
  const Lesson = mongoose.model('Lesson');
  this.lessonsCount = await Lesson.countDocuments({ course: this._id });
  await this.save();
};

module.exports = mongoose.model('Course', courseSchema);
