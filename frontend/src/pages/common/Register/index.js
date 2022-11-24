import { Form, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { hideLoading, showLoading } from "../../../redux/loaderSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
        dispatch(showLoading())
        const response =  await registerUser(values);
        dispatch(hideLoading());
        if(response.success){
            message.success(response.message);
            navigate("/login");
        }
        else{
            message.error(response.message);
        }
    } catch (error) {
      dispatch(hideLoading())
        message.error(error.message);
    }
  };

  return (  
    <div className="flex justify-center items-center h-screen w-screen bg-primary">
      <div className="card w-400 p-3 bg-white">
        <div className="flex flex-col">
          <h1 className="text-xl">MY-QUIZ REGISTER <i className="ri-user-add-line"></i></h1>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <FormItem name="name" label="Name ">
              <input type="text" />
            </FormItem>
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
                Register
              </button>
              <Link to="/login" className="text-center mt-2 underline">
                Already a member? Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
