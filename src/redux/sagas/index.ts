import { all } from "redux-saga/effects";
import app from "./app";
import auth from "./auth";
import classes from "./classes";
import compiles from "./compiles";
import courses from "./courses";
import exercises from "./exercises";
import lecturers from "./lecturers";
import lessons from "./lessons";
import modules from "./modules";
import quizzes from "./quizzes";
import roles from "./roles";
import students from "./students";
import users from "./users";

export default function* root() {
  yield all([
    app(),
    auth(),
    classes(),
    compiles(),
    courses(),
    exercises(),
    lecturers(),
    lessons(),
    modules(),
    quizzes(),
    roles(),
    students(),
    users(),
  ]);
}
