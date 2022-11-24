import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/pageTitle";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";
import { getReportsByID } from "../../../apicalls/reports";
import moment from 'moment';

function UserReport() {
  const [reportsData, setReportsData] = useState([]);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text,record) => <>
      {record.exam.name}
      </>
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text,record) => <>
      {moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}
      </>
    },
    {
      title: "Total Marks",
      dataIndex: "totalQuestions",
      render: (text,record) => <>
      {record.exam.totalMarks}
      </>
    },
    {
      title: "Passing Marks",
      dataIndex: "correctAnswers",
      render: (text,record) => <>
      {record.exam.passingMarks}
      </>
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text,record) => <>
      {record.result.correctAnswers.length}
      </>
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text,record) => <>
      {record.result.verdict}
      </>
    },
  ];

  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getReportsByID();
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
    getData();
  },[]);

  return (
    <div>
      <PageTitle title="Reports" />
      <div className="divider"></div>
      <Table columns={columns} dataSource={reportsData} />
    </div>
  );
}

export default UserReport;
