/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import DatePicker from "react-datepicker";
import {
  getClasses,
  getStudentsInClass,
} from "../../redux/actions/classesActions";
import {
  deleteQuiz,
  getQuizDetail,
  postCreateQuiz,
  putUpdateQuiz,
} from "../../redux/actions/quizzesActions";
import {
  classes,
  prog_languages,
  students,
  student_to_quiz,
} from "../../types";
import moment from "moment";
import { getServerTime } from "../../redux/actions/appActions";
import { RootState } from "../../redux/store";
import Swal from "sweetalert2";
import { getCourses } from "../../redux/actions/coursesActions";

const Upsert = () => {
  const { id } = useParams<{ id?: string }>();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = React.useState(id ? true : false);
  const [title, setTitle] = React.useState("");
  const [question, setQuestion] = React.useState("");
  const [classID, setClassID] = React.useState("");
  const [classData, setClassData] = React.useState<classes[]>([]);
  const [studentsData, setStudentsData] = React.useState<students[]>([]);
  const [courses, setCourses] = React.useState<prog_languages[]>([]);
  const [courseID, setCourseID] = React.useState("");
  const [selectedStudents, setSelectedStudents] = React.useState<students[]>(
    []
  );
  const [dueTime, setDueTime] = React.useState<Date>();

  const [serverTime, setServerTime] = React.useState<number>();

  const [studentQuiz, setStudentQuiz] = React.useState<student_to_quiz[]>([]);

  React.useEffect(() => {
    nProgress.start();
    dispatch(
      getClasses.request({
        onFailure: () => {
          nProgress.done();
        },
        onSuccess: (res) => {
          nProgress.done();
          setClassData(res);
        },
      })
    );
    dispatch(
      getServerTime.request({
        onFailure: () => {
          nProgress.done();
        },
        onSuccess: (res) => {
          nProgress.done();
          setServerTime(res.time);
        },
      })
    );
    dispatch(
      getCourses.request({
        onFailure: () => {
          nProgress.done();
        },
        onSuccess: (res) => {
          nProgress.done();
          setCourses(res);
          setCourseID(res[0].id);
        },
      })
    );

    if (id) {
      fetchDetail();
    }
  }, []);

  const fetchDetail = () => {
    if (id) {
      nProgress.start();
      dispatch(
        getQuizDetail.request({
          id,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Terjadi Kesalahan");
            history.replace("/lecturer/data/quizzes");
          },
          onSuccess: (res) => {
            nProgress.done();
            setLoading(false);
            setTitle(res.title);
            setQuestion(res.question);
            setDueTime(res.due_time);
            setClassID(res.class_id);
            setSelectedStudents(
              res.student_to_quiz?.map((v) => v.students as students) ?? []
            );
            setStudentQuiz(res.student_to_quiz ?? []);
          },
        })
      );
    }
  };

  React.useEffect(() => {
    if (classID) {
      nProgress.start();
      dispatch(
        getStudentsInClass.request({
          id: classID,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Terjadi Kesalahan");
            history.replace("/lecturer/data/quizzes");
          },
          onSuccess: (res) => {
            nProgress.done();
            setLoading(false);
            if (res.students) {
              setStudentsData(res.students);
              if (!id) {
                setSelectedStudents(res.students);
              }
            }
          },
        })
      );
    }
  }, [classID]);

  // React.useEffect(() => {
  //   if (id) {
  //     nProgress.start();
  //     if(classID) {
  //       dispatch(
  //         getStudentsInClass.request({
  //           id: classID,
  //           onFailure: () => {
  //             nProgress.done();
  //             setLoading(false);
  //             toast.error("Terjadi Kesalahan");
  //             history.replace("/lecturer/data/quizzes");
  //           },
  //           onSuccess: (res) => {
  //             nProgress.done();
  //             setLoading(false);
  //             if (res.students) {
  //               setStudentsData(res.students);
  //               if (!id) {
  //                 setSelectedStudents(res.students);
  //               }
  //             }
  //             // toast.success("success");
  //           },
  //         })
  //       );
  //     }
  //   }
  // }, [classID]);

  const onCreate = () => {
    nProgress.start();
    setLoading(true);
    dispatch(
      postCreateQuiz.request({
        data: {
          assignee_id: user?.id ?? "",
          class_id: classID,
          question,
          title,
          due_time: dueTime ?? new Date(),
          assigned_students: selectedStudents,
          prog_languages_id: courseID,
        },
        onSuccess: () => {
          nProgress.done();
          setLoading(false);
          toast.success("Data berhasil ditambahkan!");
          history.replace("/lecturer/quizzes");
        },
        onFailure: () => {
          nProgress.done();
          setLoading(false);
        },
      })
    );
  };

  const onDelete = (id: string) => {
    Swal.fire({
      title: "Hapus Data?",
      text: "Data akan dihapus, apakah anda yakin??",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Hapus`,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch(
          deleteQuiz.request({
            id: id,
            onSuccess: () => {
              toast.success("Data berhasil dihapus!");
              history.replace("/lecturer/quizzes");
            },
            onFailure: (err) => {
              toast.error(err);
            },
          })
        );
      }
    });
  };

  const onUpdate = () => {
    if (id) {
      nProgress.start();
      setLoading(true);
      dispatch(
        putUpdateQuiz.request({
          id,
          data: {
            prog_languages_id: courseID,
            assignee_id: user?.id ?? "",
            class_id: classID,
            question,
            title,
            due_time: dueTime ?? new Date(),
            assigned_students: selectedStudents.filter(
              (v) => !studentQuiz.find((_v) => _v.student_id === v.id)
            ),
          },
          onSuccess: () => {
            setLoading(false);
            toast.success("Data berhasil diubah!");
            nProgress.done();
          },
          onFailure: () => {
            setLoading(false);
          },
        })
      );
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <div>
            <div className="flex space-x-8 items-center">
              <Button
                onClick={() => {
                  history.replace("/lecturer/quizzes");
                }}
              >
                <i className="fas fa-arrow-left mr-4" /> Back
              </Button>
              <div className="text-xl font-bold flex-1">
                {id ? "Edit" : "Tambah"} Quiz
              </div>
              {id ? (
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    onDelete(id);
                  }}
                >
                  <i className="fas fa-trash mr-4" /> Delete
                </Button>
              ) : null}
            </div>
            <div className="h-px bg-blueGray-200 dark:bg-blueGray-700 my-4" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (id) {
                  onUpdate();
                } else {
                  onCreate();
                }
              }}
              className="flex space-x-16"
            >
              <div className="flex-1">
                <div className="block text-gray-700 dark:text-gray-200 mb-4">
                  <span>Quiz Name</span>
                  <Input
                    type="text"
                    placeholder="Nama Kuis"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="block text-gray-700 dark:text-gray-200 mb-4">
                  <span>Course</span>
                  <DropDown
                    data={courses.map((v) => ({ value: v.id, name: v.name }))}
                    onChange={(v) => setCourseID(v)}
                  />
                </div>
                <div className="block text-gray-700 dark:text-gray-200 mb-4">
                  <span>Quiz Description</span>
                  <TextArea
                    placeholder="Deskripsi Kuis"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>
                <div className="block text-gray-700 dark:text-gray-200 mb-4">
                  <span>Submission Deadline</span>
                  <div className="mt-2">
                    {serverTime ? (
                      <DatePicker
                        autoFocus={false}
                        onChange={(time) => {
                          setDueTime(time as Date);
                        }}
                        customInput={
                          <div className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 bg-blue-100 dark:bg-blueGray-900  rounded-md hover:bg-blue-200 dark:hover:bg-blue-900 focus:outline-none cursor-pointer">
                            {moment(dueTime).format("HH:mm, DD MMMM YYYY")}
                          </div>
                        }
                        selected={moment(dueTime).toDate()}
                        minDate={moment(serverTime).toDate()}
                        showTimeInput
                        minTime={moment(serverTime).toDate()}
                      />
                    ) : null}
                  </div>
                </div>

                <Button
                  disabled={
                    !title ||
                    !question ||
                    selectedStudents.length === 0 ||
                    loading
                  }
                  className="w-full"
                >
                  <i className="fas fa-save mr-4" /> Save
                </Button>
              </div>
              <div className="flex-1">
                <div className="block text-gray-700 dark:text-gray-200 mb-4">
                  <span>Classes</span>
                  <DropDown
                    disabled={id ? true : false}
                    data={classData.map((v) => ({
                      value: v.id ?? "",
                      name: `${v.kelas} ${v.program} ${v.jurusan}`,
                    }))}
                    onChange={(v) => setClassID(v)}
                  />
                </div>
                <div className="block text-gray-700 dark:text-gray-200 mb-4">
                  <span>Assigned Student</span>
                  <div className="flex space-x-4 font-bold-bold p-2 dark:bg-blueGray-700 bg-blueGray-100 mt-2 divide-gray-700">
                    <div className="w-12">Chosen</div>
                    <div className="w-20">NRP</div>
                    <div className="flex-1">Name</div>
                  </div>
                  {studentsData.map((v) => (
                    <div className="flex space-x-4 p-2">
                      <div className="w-12">
                        {selectedStudents.find((_v) => _v.id === v.id) ? (
                          <i
                            className="fas fa-check-square text-blue-600 dark:text-blue-400 text-lg cursor-pointer"
                            onClick={() => {
                              if (
                                id &&
                                studentQuiz.find(
                                  (__v) => __v.student_id === v.id
                                )
                              ) {
                                return;
                              }
                              setSelectedStudents(
                                selectedStudents.filter(
                                  (__v) => __v.id !== v.id
                                )
                              );
                            }}
                          />
                        ) : (
                          <i
                            className="fas fa-square text-blueGray-200 dark:text-blueGray-700 text-lg cursor-pointer"
                            onClick={() =>
                              setSelectedStudents([...selectedStudents, v])
                            }
                          />
                        )}
                      </div>
                      <div className="w-20">{v.nrp}</div>
                      <div className="flex-1">{v.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
      {id ? (
        <>
          <div className="text-xl font-bold mt-12 mb-4 dark:text-white">
            Submissions
          </div>
          <div className="grid grid-cols-2 gap-6 my-6">
            {studentQuiz.map((v) => {
              return (
                <Link
                  to={`/lecturer/quizzes/submission/${v.quiz_id}&${v.student_id}`}
                >
                  <Card
                    className={` shadow-none border-l-4 ${
                      v.is_submitted
                        ? "border-green-600 dark:border-green-400"
                        : "border-blue-600 dark:border-blue-400"
                    }  `}
                  >
                    <div>
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="text-lg font-bold">
                            {v.students?.name}
                          </div>
                          <div className="text-xs">{v.students?.nrp}</div>
                        </div>
                        {v.is_submitted ? (
                          <div className="text-xs bg-green-400 dark:bg-green-600 font-bold rounded mb-1 py-1 px-2">
                            Done
                          </div>
                        ) : null}
                      </div>

                      <div className="flex mt-2">
                        <div className="flex-1 mr-4">
                          <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500">
                            Submitted
                          </div>
                          <div>
                            {v.is_submitted ? (
                              <i className="fas fa-check-square text-blue-600 dark:text-blue-400 text-lg cursor-pointer" />
                            ) : (
                              <i className="fas fa-square text-blueGray-200 dark:text-blueGray-700 text-lg cursor-pointer" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 mr-4">
                          <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500">
                            Time Submitted
                          </div>
                          <div>
                            {v.time_submitted
                              ? moment(v.time_submitted).format(
                                  "HH:mm DD MMMM YYYY"
                                )
                              : "-"}
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-2">
                        <div className="flex-1 mr-4">
                          <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500">
                            Given Feedback
                          </div>
                          <div className="truncate">
                            {v.feedback ? (
                              <i className="fas fa-check-square text-blue-600 dark:text-blue-400 text-lg cursor-pointer" />
                            ) : (
                              <i className="fas fa-square text-blueGray-200 dark:text-blueGray-700 text-lg cursor-pointer" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 mr-4">
                          <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500">
                            Score
                          </div>
                          <div>{v.score ?? "-"}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Upsert;
