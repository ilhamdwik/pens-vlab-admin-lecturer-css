import { createAsyncAction } from "typesafe-actions";
import { 
  lecturers, 
  students, 
  student_to_lecturer 
} from "../../types";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const getStudents = createAsyncAction(
  "REQUEST_GET_STUDENT",
  "SUCCESS_GET_STUDENT",
  "ERROR_GET_STUDENT"
)<
  {
    page?: number;
    onSuccess: (res: students[], count: number) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getStudentsLecturer = createAsyncAction(
  "REQUEST_GET_STUDENT_LECTURER",
  "SUCCESS_GET_STUDENT_LECTURER",
  "ERROR_GET_STUDENT_LECTURER"
)<
  {
    // assigned_id: string;
    page?: number;
    onSuccess: (res: student_to_lecturer[], count: number) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getStudentDetail = createAsyncAction(
  "REQUEST_GET_STUDENT_DETAIL",
  "SUCCESS_GET_STUDENT_DETAIL",
  "ERROR_GET_STUDENT_DETAIL"
)<
  {
    id: string;
    onSuccess: (res: students) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getStudentDetailLecturer = createAsyncAction(
  "REQUEST_GET_STUDENT_DETAIL_LECTURER",
  "SUCCESS_GET_STUDENT_DETAIL_LECTURER",
  "ERROR_GET_STUDENT_DETAIL_LECTURER"
)<
  {
    id: string;
    onSuccess: (res: student_to_lecturer, studentProgress: number) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postCreateStudent = createAsyncAction(
  "REQUEST_POST_CREATE_STUDENT",
  "SUCCESS_POST_CREATE_STUDENT",
  "ERROR_GET_POST_CREATE_STUDENT"
)<
  {
    data: {
      class_id: string;
      name: string;
      nrp: string;
    };
    onSuccess: (res: students) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postCreateStudentLecturer = createAsyncAction(
  "REQUEST_POST_CREATE_STUDENT_LECTURER",
  "SUCCESS_POST_CREATE_STUDENT_LECTURER",
  "ERROR_GET_POST_CREATE_STUDENT_LECTURER"
)<
  {
    data: {
      class_id: string;
      assigned_id: string;
      assigned_students: students[];
    };
    onSuccess: (res: lecturers) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const putUpdateStudent = createAsyncAction(
  "REQUEST_PUT_UPDATE_STUDENT",
  "SUCCESS_PUT_UPDATE_STUDENT",
  "ERROR_GET_PUT_UPDATE_STUDENT"
)<
  {
    id: string;
    data: {
      class_id: string;
      name: string;
      nrp: string;
    };
    onSuccess: (res: students) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const putUpdateStudentLecturer = createAsyncAction(
  "REQUEST_UPDATE_STUDENT_LECTURER",
  "SUCCESS_UPDATE_STUDENT_LECTURER",
  "ERROR_GET_UPDATE_STUDENT_LECTURER"
)<
  {
    data: {
      class_id: string;
      assigned_id: string;
      assigned_students: students[];
    };
    onSuccess: (res: lecturers) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const deleteStudent = createAsyncAction(
  "REQUEST_DELETE_STUDENT",
  "SUCCESS_DELETE_STUDENT",
  "ERROR_GET_DELETE_STUDENT"
)<
  {
    id: string;
    onSuccess: () => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
