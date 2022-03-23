import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { Provider as ReduxProvider, useSelector } from "react-redux";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { persistor, RootState, store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer, Slide } from "react-toastify";
import axios from "axios";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import "./assets/styles/index.css";
import "./assets/styles/nprogress.css";
import "react-toastify/dist/ReactToastify.min.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "react-datepicker/dist/react-datepicker.css";
import { Layout } from "./containers/Layout";
import Login from "./pages/Login";
import Loader from "./pages/Loader";
import Home from "./pages/Home";
import DummyLogin from "./pages/DummyLogin";

// pages admin
import Classes from "./pages/Classes/index";
import UpsertClass from "./pages/Classes/Upsert";
import Courses from "./pages/Courses/index";
import UpsertCourses from "./pages/Courses/Upsert";
import Modules from "./pages/Modules/index";
import UpsertModules from "./pages/Modules/Upsert";
import Lessons from "./pages/Lessons/index";
import UpsertLessons from "./pages/Lessons/Upsert";
import Students from "./pages/Students/index";
import UpsertStudents from "./pages/Students/Upsert";
import Lecturers from "./pages/Lecturers/index";
import UpsertLecturers from "./pages/Lecturers/Upsert";
import ProtectedRoute from "./components/ProtectedRoute";

// pages lecturer
import CoursesLecturer from "./pages/CoursesLecturer/index";
import UpsertCourseLecturer from "./pages/CoursesLecturer/Upsert";
import ModulesLecturer from "./pages/ModulesLecturer/index";
import UpsertModulesLecturer from "./pages/ModulesLecturer/Upsert";
import LessonsLecturer from "./pages/LessonsLecturer/index";
import UpsertLessonsLecturer from "./pages/LessonsLecturer/Upsert";
import Quizzes from "./pages/Quizzes/index";
import Submission from "./pages/Quizzes/Submission";
import UpsertQuizzes from "./pages/Quizzes/Upsert";

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

declare global {
  /*~ Here, declare things that go in the global namespace, or augment
   *~ existing declarations in the global namespace
   */
  interface Error {
    response: {
      data: {
        message: string;
      };
      status: number;
    };
  }
}

const Navigation = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return (
    <BrowserRouter>
      <Switch>
        {/* only use in DEV */}
        {process.env.REACT_APP_ENV === "DEV" ? (
          <Route path="/___dummy-login___" exact component={DummyLogin} />
        ) : null}

        <Route path="/admin/login" exact component={Login} />
        <Route path="/load" exact component={Loader} />

        <ProtectedRoute
          path="/admin/"
          admin
          component={() => (
            <Layout>
              <Switch>
                <Route path="/admin/home" exact component={Home} />
                <Route path="/admin/data/classes" exact component={Classes} />
                <Route
                  path="/admin/data/classes/create"
                  exact
                  component={UpsertClass}
                />
                <Route
                  path="/admin/data/classes/update/:id"
                  exact
                  component={UpsertClass}
                />
                <Route path="/admin/data/courses" exact component={Courses} />
                <Route
                  path="/admin/data/courses/create"
                  exact
                  component={UpsertCourses}
                />
                <Route
                  path="/admin/data/courses/update/:id"
                  exact
                  component={UpsertCourses}
                />
                <Route path="/admin/data/modules" exact component={Modules} />
                <Route
                  path="/admin/data/modules/create"
                  exact
                  component={UpsertModules}
                />
                <Route
                  path="/admin/data/modules/update/:id"
                  exact
                  component={UpsertModules}
                />
                <Route path="/admin/data/lessons" exact component={Lessons} />
                <Route
                  path="/admin/data/lessons/create"
                  exact
                  component={UpsertLessons}
                />
                <Route
                  path="/admin/data/lessons/update/:id"
                  exact
                  component={UpsertLessons}
                />
                <Route path="/admin/data/students" exact component={Students} />
                <Route
                  path="/admin/data/students/create"
                  exact
                  component={UpsertStudents}
                />
                <Route
                  path="/admin/data/students/update/:id"
                  exact
                  component={UpsertStudents}
                />
                <Route
                  path="/admin/data/lecturers"
                  exact
                  component={Lecturers}
                />
                <Route
                  path="/admin/data/lecturers/create"
                  exact
                  component={UpsertLecturers}
                />
                <Route
                  path="/admin/data/lecturers/update/:id"
                  exact
                  component={UpsertLecturers}
                />
                <Redirect to="/admin/home" />
              </Switch>
            </Layout>
          )}
        />
        <ProtectedRoute
          path="/lecturer/"
          component={() => (
            <Layout>
              <Switch>
                <Route path="/lecturer/home" exact component={Home} />
                <Route path="/lecturer/data/courses" exact component={CoursesLecturer} />
                <Route
                  path="/lecturer/data/courses/create"
                  exact
                  component={UpsertCourseLecturer}
                />
                <Route
                  path="/lecturer/data/courses/update/:id"
                  exact
                  component={UpsertCourseLecturer}
                />
                <Route path="/lecturer/data/modules" exact component={ModulesLecturer} />
                <Route
                  path="/lecturer/data/modules/create"
                  exact
                  component={UpsertModulesLecturer}
                />
                <Route
                  path="/lecturer/data/modules/update/:id"
                  exact
                  component={UpsertModulesLecturer}
                />
                <Route path="/lecturer/data/lessons" exact component={LessonsLecturer} />
                <Route
                  path="/lecturer/data/lessons/create"
                  exact
                  component={UpsertLessonsLecturer}
                />
                <Route
                  path="/lecturer/data/lessons/update/:id"
                  exact
                  component={UpsertLessonsLecturer}
                />
                <Route path="/lecturer/quizzes" exact component={Quizzes} />
                <Route
                  path="/lecturer/quizzes/submission/:id"
                  exact
                  component={Submission}
                />
                <Route
                  path="/lecturer/quizzes/create"
                  exact
                  component={UpsertQuizzes}
                />
                <Route
                  path="/lecturer/quizzes/update/:id"
                  exact
                  component={UpsertQuizzes}
                />
                <Redirect to="/lecturer/home" />
              </Switch>
            </Layout>
          )}
        />

        <Redirect to="/load" />
      </Switch>
      <ToastContainer
        transition={Slide}
        autoClose={2000}
        position="bottom-right"
        hideProgressBar
        toastClassName={(prop) =>
          contextClass[prop?.type || "default"] +
          " relative flex p-4 my-4 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        }
      />
    </BrowserRouter>
  );
};

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <Navigation />
    </ReduxProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
