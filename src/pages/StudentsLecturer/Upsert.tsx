/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import DropDown from "../../components/DropDown";
import { 
  getClasses, 
  getStudentsInClass 
} from "../../redux/actions/classesActions";
import {
  getLecturerDetail,
} from "../../redux/actions/lecturersActions";
import { postCreateStudentLecturer, putUpdateStudentLecturer } from "../../redux/actions/studentsActions";
import { RootState } from "../../redux/store";
import { 
  classes, 
  students, 
  student_to_lecturer 
} from "../../types";

const Upsert = () => {
  const { id } = useParams<{ id?: string }>();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = React.useState(id ? true : false);
  const [classID, setClassID] = React.useState("");
  const [classData, setClassData] = React.useState<classes[]>([]);
  const [studentsData, setStudentsData] = React.useState<students[]>([]);
  const [selectedStudents, setSelectedStudents] = React.useState<students[]>(
    []
  );
  const [studentLecturer, setStudentLecturer] = React.useState<student_to_lecturer[]>([]);

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

    if (id) {
      fetchDetail();
    }
  }, []);

  const fetchDetail = () => {
    if (id) {
      nProgress.start();
      dispatch(
        getLecturerDetail.request({
          id,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Terjadi Kesalahan");
            history.replace("/admin/data/lecturers");
          },
          onSuccess: (res) => {
            nProgress.done();
            setLoading(false);
            setClassID(res.class_id);
            setSelectedStudents(
              res.student_to_lecturer?.map((v) => v.students as students) ?? []
            );
            setStudentLecturer(res.student_to_lecturer ?? []);
          },
        })
      );
    }
  }

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

  const onCreate = () => {
    nProgress.start();
    setLoading(true);
    dispatch(
      postCreateStudentLecturer.request({
        data: {
          class_id: classID,
          assigned_id: user?.id ?? "",
          assigned_students: selectedStudents,
        },
        onSuccess: () => {
          nProgress.done();
          setLoading(false);
          toast.success("Data berhasil ditambahkan!");
          history.replace("/lecturer/data/students");
        },
        onFailure: (err) => {
          nProgress.done();
          setLoading(false);
          toast.error(err.response.data.message);
        },
      })
    );
  };

  const onUpdate = () => {
    if (classID !== "") {
      nProgress.start();
      setLoading(true);
      dispatch(
        putUpdateStudentLecturer.request({
          data: {
            class_id: classID,
            assigned_id: user?.id ?? "",
            assigned_students: selectedStudents.filter(
              (v) => !studentLecturer.find((_v) => _v.student_id === v.id)
            ),
          },
          onSuccess: () => {
            setLoading(false);
            toast.success("Data berhasil diubah!");
            history.replace("/lecturer/data/students");
          },
          onFailure: (err) => {
            setLoading(false);
            toast.error(err.response.data.message);
            // history.replace("/lecturer/data/students");
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
                  history.goBack();
                }}
              >
                <i className="fas fa-arrow-left mr-4" /> Back
              </Button>
              <div className="text-xl font-bold">
                Student
              </div>
            </div>
            <div className="h-px bg-blueGray-200 dark:bg-blueGray-700 my-4" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (classID !== "") {
                  onUpdate();
                } else {
                  onCreate();
                }
              }}
              className="lg:w-1/3 flex flex-col"
            >
              <div className="block text-gray-700 dark:text-gray-200 mb-4">
                <span>Classes</span>
                <DropDown
                  data={classData.map((v) => ({
                    value: v.id ?? "",
                    name: `${v.kelas} ${v.program} ${v.jurusan}`,
                  }))}
                  onChange={(v) => setClassID(v)}
                />
                <div className="block text-gray-700 dark:text-gray-200 mt-4 mb-4">
                  <span>Added Student</span>
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
                                studentLecturer.find(
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
              <Button
                disabled={(id ? false : !classID) || loading}
                className=""
              >
                <i className="fas fa-save mr-4" /> Save
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Upsert;
