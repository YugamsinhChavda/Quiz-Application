import "./App.css";
//import { Button } from "antd";
import "./stylesheets/theme.css";
import "./stylesheets/alignments.css";
import "./stylesheets/theme.css";
import "./stylesheets/customs.css";
import "./stylesheets/form-elements.css";
import "./stylesheets/layout.css";
import "./stylesheets/textelements.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/common/login";
import Register from "./pages/common/Register";
import ProtectedRoute from "./components/protectedRoute";
import Home from "./pages/common/Home/index";
import Exam from "./pages/admin/Exams/index";
import AddEditExam from "./pages/admin/Exams/AddExams";
import Loader from "./components/loader";
import { useSelector } from "react-redux";
import WriteExam from "./pages/user/WriteExam/index";
import UserReport from "./pages/user/UserReports";
import AdminReport from "./pages/admin/AdminReport";
function App() {
  const { loading } = useSelector((state) => state.loader);

  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/write-exam/:id"
            element={
              <ProtectedRoute>
                <WriteExam />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/reports"
            element={
              <ProtectedRoute>
                <UserReport />
              </ProtectedRoute>
            }
          /> 

            <Route
            path="/admin/reports"
            element={
              <ProtectedRoute>
                <AdminReport />
              </ProtectedRoute>
            }
          /> 



          <Route
            path="/admin/exams"
            element={
              <ProtectedRoute>
                <Exam />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/exams/add"
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/exams/edit/:id"
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
