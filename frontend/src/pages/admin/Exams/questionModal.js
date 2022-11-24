import { Form, message, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addQuestion, editQuestion } from "../../../apicalls/exams";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";

function QuestionModal({
  setShowAddEditQuestionModal,
  showAddEditQuestionModal,
  refreshData,
  examId,
  selectedQuestion,
  setSelectedQuestion
}) {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: examId,
      };
      let response;
      if(selectedQuestion){
        response = await editQuestion({
          ...requiredPayload,
          questionId: selectedQuestion._id
        })
      }
      else{
        response = await addQuestion(requiredPayload);
      }
      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowAddEditQuestionModal(false);
      } else {
        message.error(response.message);
      }
      setSelectedQuestion(null);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading);
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={selectedQuestion? "Edit Question" : "Add Question"}
      visible={showAddEditQuestionModal}
      footer={false}
      onCancel={() => {
        setShowAddEditQuestionModal(false)
        setSelectedQuestion(null);
      }}
    >
      <Form onFinish={onFinish} layout="vertical"
        initialValues={{
          name: selectedQuestion?.name,
          correctOption: selectedQuestion?.correctOption,
          A: selectedQuestion?.options?.A,
          B: selectedQuestion?.options?.B,
          C: selectedQuestion?.options?.C,
          D: selectedQuestion?.options?.D
        }}
      >
        <Form.Item name="name" label="Question">
          <input type="text"></input>
        </Form.Item>
        <Form.Item name="correctOption" label="Correct Option">
          <input type="text"></input>
        </Form.Item>

        <div className="flex justify-between gap-3">
          <Form.Item name="A" label="Option A">
            <input type="text"></input>
          </Form.Item>
          <Form.Item name="B" label="Option B">
            <input type="text"></input>
          </Form.Item>
        </div>

        <div className="flex justify-between gap-3">
          <Form.Item name="C" label="Option C">
            <input type="text"></input>
          </Form.Item>
          <Form.Item name="D" label="Option D">
            <input type="text"></input>
          </Form.Item>
        </div>

        <div className="flex justify-end mt-2 gap-3">
          <button
            className="primary-outlined-btn"
            type="button"
            onClick={() => setShowAddEditQuestionModal(false)}
          >
            Cancel
          </button>

          <button className="primary-contained-btn">Save</button>
        </div>
      </Form>
    </Modal>
  );
}

export default QuestionModal;
