const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "quizuserdata"
    },
    exam : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "exams"
    }, 
    result: {
        type: Object,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model("reports",reportSchema);