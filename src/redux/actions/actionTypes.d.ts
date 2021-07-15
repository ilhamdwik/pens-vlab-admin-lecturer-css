import { ActionType } from "typesafe-actions";
import * as appActions from "./appActions";
import * as classesActions from "./classesActions";
import * as compileActions from "./compileActions";
import * as coursesActions from "./coursesActions";
import * as exercisesActions from "./exercisesActions";
import * as lecturersActions from "./lecturersActions";
import * as lessonsActions from "./lessonsActions";
import * as modulesActions from "./modulesActions";
import * as quizzesActions from "./quizzesActions";
import * as rolesActions from "./rolesActions";
import * as studentsActions from "./studentsActions";
import * as usersActions from "./usersActions";

export type AppAction = ActionType<typeof appActions>;
export type AuthAction = ActionType<typeof authActions>;
export type ClassesAction = ActionType<typeof classesActions>;
export type CoursesAction = ActionType<typeof coursesActions>;
export type CompileAction = ActionType<typeof compileActions>;
export type ExercisesAction = ActionType<typeof exercisesActions>;
export type LecturersAction = ActionType<typeof lecturersActions>;
export type LessonsAction = ActionType<typeof lessonsActions>;
export type ModulesAction = ActionType<typeof modulesActions>;
export type QuizzesAction = ActionType<typeof quizzesActions>;
export type RolesAction = ActionType<typeof rolesActions>;
export type StudentsAction = ActionType<typeof studentsActions>;
export type UsersAction = ActionType<typeof usersActions>;

export type RootAction =
  | AppAction
  | AuthAction
  | ClassesAction
  | CompileAction
  | CoursesAction
  | ExercisesAction
  | LecturersAction
  | LessonsAction
  | ModulesAction
  | QuizzesAction
  | RolesAction
  | StudentsAction
  | UsersAction;
