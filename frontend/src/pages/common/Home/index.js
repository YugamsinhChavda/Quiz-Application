import React, { useEffect, useState } from "react";
import { getExams } from "../../../apicalls/exams";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import { Col, message, Row } from "antd";
import PageTitle from "../../../components/pageTitle";
import { useNavigate } from "react-router-dom";

function Home() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getExamData = async () => {
    try {
      dispatch(showLoading());
      const response = await getExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExamData();
  }, []);

  return (
    user && (
      <div>
        <PageTitle title={`Hi ${user?.name}, Welcome to MY-QUIZ`} />
        <div className="divider"></div>
        <Row gutter={[16, 16]}>
          {exams.map((exam) => (
            <Col span={6}>
              <div className="card-lg flex flex-col gap-1 p-2">
                <h1 className="text-xl">{exam.name}</h1>
                <h1 className="text-md">Category : {exam.category}</h1>
                <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
                <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
                <h1 className="text-md">Duration : {exam.duration}</h1>
                <button
                  className="primary-outlined-btn"
                  onClick={() => {
                    navigate(`/user/write-exam/${exam._id}`);
                  }}
                >
                  Start Exam
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    )
  );
}

export default Home;
