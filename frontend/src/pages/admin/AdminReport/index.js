import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/pageTitle";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import { getReports } from "../../../apicalls/reports";
import moment from "moment";

function AdminReport() {
  const [reportsData, setReportsData] = useState([]);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    examName: "",
    userName: "",
  });

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam.name}</>,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text, record) => <>{record.user.name}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text, record) => <>{record.exam.totalMarks}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.exam.passingMarks}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result.correctAnswers.length}</>,
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result.verdict}</>,
    },
  ];

  const getData = async (tempFilters) => {
    try {
      dispatch(showLoading());
      const response = await getReports(tempFilters);
      if (response.success) {
        setReportsData(response.data);
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
    getData(filter);
  }, []);

  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Exam"
          value={filter.examName}
          onChange={(e) => setFilter({ ...filter, examName: e.target.value })}
        ></input>
        <input
          type="text"
          placeholder="User"
          value={filter.userName}
          onChange={(e) => setFilter({ ...filter, userName: e.target.value })}
        ></input>
        <button
          className="primary-outlined-btn"
          onClick={() => {
            setFilter({
              examName: "",
              userName: "",
            });
            getData({
              examName: "",
              userName: "",
            });
          }}
        >
          Clear
        </button>
        <button className="primary-contained-btn" onClick={() => getData(filter)}>
          Search
        </button>
      </div>
      <Table columns={columns} dataSource={reportsData} className="mt-2" />
    </div>
  );
}

export default AdminReport;
