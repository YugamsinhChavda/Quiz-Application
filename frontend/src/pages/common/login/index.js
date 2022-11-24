import { Form, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";

function Login() {
  const dispatch = useDispatch();
  
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await loginUser(values);
      dispatch(hideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary">
      <div className="card w-400 p-3 bg-white">
        <div className="flex flex-col">
          <div className="flex">
          <h1 className="text-xl">MY-QUIZ LOGIN <i className="ri-login-circle-line"></i></h1>
          
          </div>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <FormItem name="email" label="Email">
              <input type="text" />
            </FormItem>
            <FormItem name="password" label="Password">
              <input type="password" />
            </FormItem>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Login
              </button>
              <Link to="/register" className="text-center mt-2">
                Please register if not a member
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
