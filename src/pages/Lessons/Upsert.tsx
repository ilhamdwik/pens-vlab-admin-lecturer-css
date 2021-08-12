/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import TextArea from "../../components/TextArea";
import { Editor } from "@toast-ui/react-editor";
import { Switch } from "@headlessui/react";
import {
  getLessonDetail,
  postCreateLesson,
  putUpdateLesson,
} from "../../redux/actions/lessonsActions";
import { RootState } from "../../redux/store";
import Input from "../../components/Input";
import {
  getCourseDetail,
  getCourses,
} from "../../redux/actions/coursesActions";
import { modules, prog_languages, submodules } from "../../types";
import DropDown from "../../components/DropDown";
import { getModuleDetail } from "../../redux/actions/modulesActions";

const Upsert = () => {
  const { dark } = useSelector((state: RootState) => state.app);
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const history = useHistory();

  const [courses, setCourses] = React.useState<prog_languages[]>([]);
  const [courseID, setCourseID] = React.useState("");

  const [modulesInCourse, setModulesInCourse] = React.useState<modules[]>([]);
  const [lessonInModule, setLessonInModule] = React.useState<submodules[]>([]);
  const [moduleID, setModuleID] = React.useState("");
  const [order, setOrder] = React.useState<number>(0);

  const [loading, setLoading] = React.useState(id ? true : false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [isExercise, setIsExercise] = React.useState(false);
  const [expectedOutput, setExpectedOutput] = React.useState("");
  const [expectedCode, setExpectedCode] = React.useState<string[]>([""]);
  const editorRef = React.useRef<Editor>(null);

  React.useEffect(() => {
    if (courseID) {
      nProgress.start();
      dispatch(
        getCourseDetail.request({
          id: courseID,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Terjadi Kesalahan");
          },
          onSuccess: (res) => {
            if (res.modules) {
              nProgress.done();

              setModulesInCourse(res.modules);
              setModuleID(res.modules[0].id ?? "");
            }
          },
        })
      );
    }
  }, [courseID]);

  React.useEffect(() => {
    if (moduleID) {
      nProgress.start();
      dispatch(
        getModuleDetail.request({
          id: moduleID,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Terjadi Kesalahan");
          },
          onSuccess: (res) => {
            if (res.submodules) {
              nProgress.done();

              setLessonInModule(res.submodules);
            }
          },
        })
      );
    }
  }, [moduleID]);

  React.useEffect(() => {
    nProgress.start();
    dispatch(
      getCourses.request({
        onSuccess: (res) => {
          nProgress.done();
          setCourses(res);
          setCourseID(res[0].id);
        },
        onFailure: () => {
          nProgress.done();
          setLoading(false);
          toast.error("Terjadi Kesalahan");
          history.replace("/admin/data/modules");
        },
      })
    );
    if (id) {
      nProgress.start();
      dispatch(
        getLessonDetail.request({
          id,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Terjadi Kesalahan");
            history.replace("/admin/data/lessons");
          },
          onSuccess: (res) => {
            nProgress.done();
            setLoading(false);
            setTitle(res.title);
            setContent(res.contents);
            editorRef.current?.getInstance().setMarkdown(res.contents);
            setOrder(res.order);
            setIsExercise(res.is_exercise);
            if (res.is_exercise) {
              setExpectedCode(
                JSON.parse(res.submodule_exercises?.expected_code ?? "")
              );
              setExpectedOutput(res.submodule_exercises?.expected_output ?? "");
              setModuleID(res.module_id);
              setCourseID(res.modules.prog_languages_id);
            }
          },
        })
      );
    }
  }, []);

  const onCreate = () => {
    nProgress.start();
    setLoading(true);
    dispatch(
      postCreateLesson.request({
        data: {
          contents: content,
          is_exercise: isExercise,
          module_id: moduleID,
          order: order,
          title: title,
          exercise: isExercise
            ? {
                expected_code: JSON.stringify(expectedCode),
                expected_output: expectedOutput,
                placeholder: "",
              }
            : undefined,
        },
        onSuccess: () => {
          nProgress.done();
          setLoading(false);
          toast.success("Data berhasil ditambahkan!");
          history.replace("/admin/data/lessons");
        },
        onFailure: () => {
          nProgress.done();
          setLoading(false);
        },
      })
    );
  };

  const onUpdate = () => {
    if (id) {
      nProgress.start();
      setLoading(true);
      dispatch(
        putUpdateLesson.request({
          id,
          data: {
            contents: content,
            is_exercise: isExercise,
            module_id: moduleID,
            order: order,
            title: title,
            exercise: isExercise
              ? {
                  expected_code: JSON.stringify(expectedCode),
                  expected_output: expectedOutput,
                  placeholder: "",
                }
              : undefined,
          },
          onSuccess: () => {
            setLoading(false);
            toast.success("Data berhasil diubah!");
            history.replace("/admin/data/lessons");
          },
          onFailure: () => {
            setLoading(false);
          },
        })
      );
    }
  };

  React.useEffect(() => {
    editorRef.current?.getInstance().setMarkdown(content);
  }, [dark]);

  const MDEditor = React.useCallback(() => {
    return (
      <Editor
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        theme={dark ? "dark" : undefined}
        ref={editorRef}
        usageStatistics={false}
        onChange={() =>
          setContent(editorRef.current?.getInstance().getMarkdown() ?? "")
        }
      />
    );
  }, [dark]);

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
                <i className="fas fa-arrow-left mr-4" /> Kembali
              </Button>
              <div className="text-xl font-bold">
                {id ? "Edit" : "Tambah"} Lesson
              </div>
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
              className="flex flex-col"
            >
              <div className="flex space-x-6">
                <div className="flex-1">
                  <div className="block text-gray-700 dark:text-gray-200 mb-4">
                    <span>Course</span>
                    <DropDown
                      data={courses.map((v) => ({ value: v.id, name: v.name }))}
                      onChange={(v) => setCourseID(v)}
                    />
                  </div>
                  <div className="block text-gray-700 dark:text-gray-200 mb-4">
                    <span>Modul</span>
                    <DropDown
                      data={modulesInCourse.map((v) => ({
                        value: v.id ?? "",
                        name: v.title,
                      }))}
                      onChange={(v) => setModuleID(v)}
                    />
                  </div>
                  <div className="block text-gray-700 dark:text-gray-200 mb-4">
                    <span>Lesson pada Modul</span>
                    <div className="flex space-x-4 font-bold-bold p-2 dark:bg-blueGray-700 bg-blueGray-100 mt-2 divide-gray-700">
                      <div className="w-12">Urutan</div>
                      <div className="w-20">Latihan?</div>
                      <div className="flex-1">Nama</div>
                    </div>
                    {lessonInModule.map((v) => (
                      <div className="flex space-x-4 p-2">
                        <div className="w-12">{v.order}</div>
                        <div className="w-20">
                          {v.is_exercise ? (
                            <i className="fas fa-check-square text-blue-600 dark:text-blue-400 text-lg" />
                          ) : (
                            <i className="fas fa-square text-blueGray-200 dark:text-blueGray-700 text-lg" />
                          )}
                        </div>
                        <div className="flex-1">{v.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-px bg-blueGray-200 dark:bg-blueGray-600" />
                <div className="flex-1">
                  <div className="block text-gray-700 dark:text-gray-200 mb-4">
                    <span>Nama</span>
                    <Input
                      type="text"
                      placeholder="Nama Lesson"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="block text-gray-700 dark:text-gray-200 mb-4">
                    <span>Urutan</span>
                    <Input
                      type="number"
                      placeholder="Urutan pada Modul"
                      value={order}
                      onChange={(e) => setOrder(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="block text-gray-700 dark:text-gray-200 mb-4">
                <span>Isi</span>
              </div>
              <div>
                <MDEditor />
              </div>

              <div className="block text-gray-700 dark:text-gray-200 mt-10 mb-4">
                <span>Latihan?</span>
                <div>
                  <Switch
                    checked={isExercise}
                    onChange={setIsExercise}
                    className={`${
                      isExercise ? "bg-blue-600" : "bg-blueGray-400"
                    } relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none my-4`}
                  >
                    <span className="sr-only">Latihan?</span>
                    <span
                      className={`
                    transition ease-in-out duration-200 ${
                      isExercise ? "translate-x-6" : "translate-x-1"
                    } inline-block w-4 h-4 transform bg-white rounded-full`}
                    />
                  </Switch>
                </div>
              </div>
              {isExercise ? (
                <>
                  <div className="block text-gray-700 dark:text-gray-200 mb-4">
                    <span className="mb-2">
                      Syntax pada kode yang diharapkan (contoh : for, foreach,
                      function, etc)
                    </span>
                    {expectedCode.map((v, i) => {
                      return (
                        <div className="flex items-center">
                          <div className="w-8">{i + 1}.</div>
                          <div
                            className="mx-2 cursor-pointer"
                            onClick={() => {
                              setExpectedCode(
                                expectedCode.filter((_v, _i) => _i !== i)
                              );
                            }}
                          >
                            <i className="fas fa-times text-red-400" />
                          </div>
                          <Input
                            type="text"
                            placeholder="Title"
                            className="flex-1"
                            value={v}
                            onChange={(e) => {
                              const newCode = [...expectedCode];
                              newCode[i] = e.target.value;

                              setExpectedCode(newCode);
                            }}
                          />
                        </div>
                      );
                    })}

                    <Button
                      type="button"
                      onClick={() => {
                        setExpectedCode([...expectedCode, ""]);
                      }}
                      className="mt-2 bg-white border-blue-600 dark:bg-blueGray-800 dark:border-blue-400"
                    >
                      <i className="fas fa-plus mr-4" /> Add
                    </Button>
                  </div>
                  <div className="block text-gray-700 dark:text-gray-200 mb-4">
                    <span>Output yang Diharapkan</span>
                    <TextArea
                      placeholder="Output yang Diharapkan"
                      value={expectedOutput}
                      onChange={(e) => setExpectedOutput(e.target.value)}
                    />
                  </div>
                </>
              ) : null}

              <Button
                disabled={
                  !title ||
                  !order ||
                  !content ||
                  (isExercise && (!expectedCode || !expectedOutput)) ||
                  loading
                }
                className="mt-6"
              >
                <i className="fas fa-save mr-4" /> Simpan
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Upsert;
