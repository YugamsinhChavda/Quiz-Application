const express = require("express");
const Exam = require("../models/examModel");
const router = express.Router();
const auth = require("../middleware/auth");
const Question = require("../models/questionModel");

router.post("/add", auth, async (req, res, next) => {
  try {
    const exam = await Exam.findOne({ name: req.body.name });
    if (exam) {
      return res.status(200).send({
        message: "Exam already exists",
        success: false,
      });
    }
    req.body.questions = [];
    const newExam = new Exam(req.body);
    await newExam.save();
    res.send({
      message: "Exam added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
      data: error,
    });
  }
});

router.get("/get-exams", auth, async (req, res, next) => {
  try {
    const exams = await Exam.find({});
    res.send({
      message: "Exams fetched successfully",
      data: exams,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/get-exams-id", auth, async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.body.examId).populate("questions");
    res.send({
      message: "Exam fetched successfully",
      data: exam,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/edit-exam", auth, async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.body.examId, req.body);
    res.send({
      message: "Exam edited successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/delete-exam", auth, async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.body.examId);
    res.send({
      message: "Exam deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/add-question-exam", auth, async (req, res, next) => {
  try {
    const newQuestion = new Question(req.body);
    const question = await newQuestion.save();

    const exam = await Exam.findById(req.body.exam);
    exam.questions.push(question._id);
    await exam.save();
    res.send({
      message: "Question added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/edit-questions-exam", auth, async (req, res, next) => {
  try {
    await Question.findByIdAndUpdate(req.body.questionId, req.body);
    res.send({
      message: "Question edited successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/delete-question-exam", auth, async (req, res, next) => {
  try {
    await Question.findByIdAndDelete(req.body.questionId);
    const exam = await Exam.findById(req.body.examId);
    exam.questions = exam.questions.filter(
      (question) => question._id != req.body.questionId
    );
    await exam.save();
    res.send({
      message: "Question deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

module.exports = router;
