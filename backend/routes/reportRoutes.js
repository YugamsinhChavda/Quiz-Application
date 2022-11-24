const express = require('express');
const auth = require('../middleware/auth');
const Report = require('../models/reportModel');
const User = require('../models/userModel');
const Exam = require('../models/examModel');
const router = express.Router();

router.post("/add-report", auth ,async (req,res,next) => {
    try {
        const newReport = new Report(req.body);
        await newReport.save();
        res.send({
            message: "Attempt added successfully",
            success: true,
          });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
          });
    }
} )

router.post("/get-reports", auth ,async (req,res,next) => {
    try {

        const{examName,userName} = req.body;

        const exams = await Exam.find({name:{
            $regex: examName
        }})
        const users = await User.find({name:{
            $regex: userName
        }})

        const matchedExams = exams.map((exam) => exam._id);
        const matchedUsers = users.map((user) => user._id);

        const reports = await Report.find({
            exam: {
                $in: matchedExams,
            },
            user: {
                $in: matchedUsers
            }
        }).populate("exam").populate("user").sort({createdAt:-1});
        res.send({
            message: "Attempt fetched successfully",
            success: true,
            data: reports
          });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
          });
    }
} )

router.post("/get-reports-by-userId", auth ,async (req,res,next) => {
    try {
        const reports = await Report.find({user: req.body.userId}).populate("exam").populate("user").sort({createdAt: -1});
        res.send({
            message: "Attempt fetched successfully",
            success: true,
            data: reports
          });

    } catch (error) {
        res.status(500).send({
            message: error.message,
            data: error,
            success: false,
          });
    }
} )



module.exports = router;