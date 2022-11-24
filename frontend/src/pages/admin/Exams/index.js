import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/pageTitle";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import { deleteExambyId, getExams } from "../../../apicalls/exams";

function Exam() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [exams, setExams] = useState([]);

  const getExamsData = async () => {
    try {
      dispatch(showLoading());
      const response = await getExams();
      dispatch(hideLoading());
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const deleteExam = async (examId) => {
    try {
      dispatch(showLoading());
      const response = await deleteExambyId({examId});
      dispatch(hideLoading());
      if (response.success) {
        getExamsData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
          ></i>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteExam(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getExamsData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mt-2 items-end">
        <PageTitle title="Exams" />
        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/exams/add")}
        >
          <i className="ri-add-line"></i>
          Add Exam
        </button>
      </div>
      <div className="divider"></div>

      <Table columns={columns} dataSource={exams} />
    </div>
  );
}

export default Exam;
