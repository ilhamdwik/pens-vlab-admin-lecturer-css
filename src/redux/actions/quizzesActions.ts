import { createAsyncAction } from "typesafe-actions";
import { quizzes, students, student_to_quiz } from "../../types";

/**
 * Shallow merge new state with current app reducer state and initial state
 * Useful to update persistor state when reducer has new params
 *
 * @param state params of the app reducer
 */
export const getQuizzes = createAsyncAction(
  "REQUEST_GET_QUIZ",
  "SUCCESS_GET_QUIZ",
  "ERROR_GET_QUIZ"
)<
  {
    page?: number;
    onSuccess: (res: quizzes[], count: number) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getQuizDetail = createAsyncAction(
  "REQUEST_GET_QUIZ_DETAIL",
  "SUCCESS_GET_QUIZ_DETAIL",
  "ERROR_GET_QUIZ_DETAIL"
)<
  {
    id: string;
    onSuccess: (res: quizzes) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const getSubmissionDetail = createAsyncAction(
  "REQUEST_GET_SUBMISSION_DETAIL",
  "SUCCESS_GET_SUBMISSION_DETAIL",
  "ERROR_GET_SUBMISSION_DETAIL"
)<
  {
    quizId: string;
    studentId: string;
    onSuccess: (res: student_to_quiz) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const putUpdateSubmission = createAsyncAction(
  "REQUEST_PUT_UPDATE_SUBMISSION",
  "SUCCESS_PUT_UPDATE_SUBMISSION",
  "ERROR_PUT_UPDATE_SUBMISSION"
)<
  {
    quizId: string;
    studentId: string;
    data: {
      feedback?: string;
      score?: number;
    };
    onSuccess: (res: student_to_quiz) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const postCreateQuiz = createAsyncAction(
  "REQUEST_POST_CREATE_QUIZ",
  "SUCCESS_POST_CREATE_QUIZ",
  "ERROR_GET_POST_CREATE_QUIZ"
)<
  {
    data: quizzes & {
      assigned_students: students[];
    };
    onSuccess: (res: quizzes) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const putUpdateQuiz = createAsyncAction(
  "REQUEST_PUT_UPDATE_QUIZ",
  "SUCCESS_PUT_UPDATE_QUIZ",
  "ERROR_GET_PUT_UPDATE_QUIZ"
)<
  {
    id: string;
    data: quizzes & {
      assigned_students: students[];
    };
    onSuccess: (res: quizzes) => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();

export const deleteQuiz = createAsyncAction(
  "REQUEST_DELETE_QUIZ",
  "SUCCESS_DELETE_QUIZ",
  "ERROR_GET_DELETE_QUIZ"
)<
  {
    id: string;
    onSuccess: () => void;
    onFailure: (err: Error) => void;
  },
  string,
  Error
>();
