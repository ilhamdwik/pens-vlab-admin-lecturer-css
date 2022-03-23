export const baseUrl = `${process.env.REACT_APP_BACKEND_URL}`;

export const postLoginApi = `${baseUrl}/api/v1/admin/login`;
export const userCheckApi = `${baseUrl}/api/v1/user/check`;
export const getServerTimeApi = `${baseUrl}/api/v1/get-time`;
export const etholUserDetailApi =
  "https://ethol.pens.ac.id/api/vlab/info-akun?key_vlab=etholv2-vlab";

export const compileApi = `${baseUrl}/api/v1/compile`;

// classes
export const getClassesApi = `${baseUrl}/api/v1/admin/classes`;
export const getStudentsInClassApi = `${baseUrl}/api/v1/admin/classes/students-in-class/`;
export const getClassDetailApi = `${baseUrl}/api/v1/admin/classes/`;
export const postCreateClassApi = `${baseUrl}/api/v1/admin/classes/create`;
export const putUpdateClassApi = `${baseUrl}/api/v1/admin/classes/update/`;
export const deleteClassApi = `${baseUrl}/api/v1/admin/classes/delete/`;

// courses admin
export const getCoursesApi = `${baseUrl}/api/v1/admin/courses`;
export const getCourseDetailApi = `${baseUrl}/api/v1/admin/courses/`;
export const postCreateCourseApi = `${baseUrl}/api/v1/admin/courses/create`;
export const putUpdateCourseApi = `${baseUrl}/api/v1/admin/courses/update/`;
export const deleteCourseApi = `${baseUrl}/api/v1/admin/courses/delete/`;

// courses lecturer
// export const getCoursesApiLecturer = `${baseUrl}/api/v1/lecturer/courses`;
// export const getCourseDetailApiLecturer = `${baseUrl}/api/v1/lecturer/courses/`;
// export const postCreateCourseApiLecturer = `${baseUrl}/api/v1/lecturer/courses/create`;
// export const putUpdateCourseApiLecturer = `${baseUrl}/api/v1/lecturer/courses/update/`;
// export const deleteCourseApiLecturer = `${baseUrl}/api/v1/lecturer/courses/delete/`;

// exercises
export const getExercisesApi = `${baseUrl}/api/v1/admin/exercises`;
export const getExerciseDetailApi = `${baseUrl}/api/v1/admin/exercises/`;
export const postCreateExerciseApi = `${baseUrl}/api/v1/admin/exercises/create`;
export const putUpdateExerciseApi = `${baseUrl}/api/v1/admin/exercises/update/`;
export const deleteExerciseApi = `${baseUrl}/api/v1/admin/exercises/delete/`;

// lecturers
export const getLecturersApi = `${baseUrl}/api/v1/admin/lecturers`;
export const getLecturerDetailApi = `${baseUrl}/api/v1/admin/lecturers/`;
export const postCreateLecturerApi = `${baseUrl}/api/v1/admin/lecturers/create`;
export const putUpdateLecturerApi = `${baseUrl}/api/v1/admin/lecturers/update/`;
export const deleteLecturerApi = `${baseUrl}/api/v1/admin/lecturers/delete/`;

// lessons
export const getLessonsApi = `${baseUrl}/api/v1/admin/lessons`;
export const getLessonDetailApi = `${baseUrl}/api/v1/admin/lessons/`;
export const postCreateLessonApi = `${baseUrl}/api/v1/admin/lessons/create`;
export const putUpdateLessonApi = `${baseUrl}/api/v1/admin/lessons/update/`;
export const deleteLessonApi = `${baseUrl}/api/v1/admin/lessons/delete/`;

// modules
export const getModulesApi = `${baseUrl}/api/v1/admin/modules`;
export const getModuleDetailApi = `${baseUrl}/api/v1/admin/modules/`;
export const postCreateModuleApi = `${baseUrl}/api/v1/admin/modules/create`;
export const putUpdateModuleApi = `${baseUrl}/api/v1/admin/modules/update/`;
export const deleteModuleApi = `${baseUrl}/api/v1/admin/modules/delete/`;

// quizzes
export const getQuizzesApi = `${baseUrl}/api/v1/admin/quizzes`;
export const getQuizDetailApi = `${baseUrl}/api/v1/admin/quizzes/`;
export const getSubmissionDetailApi = `${baseUrl}/api/v1/admin/quizzes/submission/`;
export const putUpdateSubmissionApi = `${baseUrl}/api/v1/admin/quizzes/submission/update/`;
export const postCreateQuizApi = `${baseUrl}/api/v1/admin/quizzes/create`;
export const putUpdateQuizApi = `${baseUrl}/api/v1/admin/quizzes/update/`;
export const deleteQuizApi = `${baseUrl}/api/v1/admin/quizzes/delete/`;

// students
export const getStudentsApi = `${baseUrl}/api/v1/admin/students`;
export const getStudentDetailApi = `${baseUrl}/api/v1/admin/students/`;
export const postCreateStudentApi = `${baseUrl}/api/v1/admin/students/create`;
export const putUpdateStudentApi = `${baseUrl}/api/v1/admin/students/update/`;
export const deleteStudentApi = `${baseUrl}/api/v1/admin/students/delete/`;

// users
export const getUsersApi = `${baseUrl}/api/v1/admin/users`;
export const getUserDetailApi = `${baseUrl}/api/v1/admin/users/`;
export const postCreateUserApi = `${baseUrl}/api/v1/admin/users/create`;
export const putUpdateUserApi = `${baseUrl}/api/v1/admin/users/update/`;
export const deleteUserApi = `${baseUrl}/api/v1/admin/users/delete/`;
