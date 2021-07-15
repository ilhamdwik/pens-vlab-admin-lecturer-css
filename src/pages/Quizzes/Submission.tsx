/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import nProgress from "nprogress";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import {
  getSubmissionDetail,
  putUpdateSubmission,
} from "../../redux/actions/quizzesActions";
import TextArea from "../../components/TextArea";
import { RootState } from "../../redux/store";
import { student_to_quiz } from "../../types";
import HashLoader from "react-spinners/ClipLoader";
import Editor from "@monaco-editor/react";
import Parse from "../../components/HTMLParser";
import { fetchCompile } from "../../redux/actions/compileActions";
import Input from "../../components/Input";

const Submission = () => {
  const { id } = useParams<{ id?: string }>();
  const quizId = id?.split("&")[0] ?? "";
  const studentId = id?.split("&")[1] ?? "";
  const { dark } = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = React.useState<student_to_quiz>();
  const [code, setCode] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [compileLoading, setCompileLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [score, setScore] = React.useState("");
  const [feedback, setFeedback] = React.useState("");

  React.useEffect(() => {
    if (id) {
      nProgress.start();
      dispatch(
        getSubmissionDetail.request({
          onFailure: () => {
            nProgress.done();
            history.replace(`/vlab-admin/quizzez/${quizId}`);
          },
          onSuccess: (res) => {
            nProgress.done();
            setData(res);
            setCode(res.code ?? "");
            setScore(res.score?.toString() ?? "");
            setFeedback(res.feedback ?? "");
          },
          quizId,
          studentId,
        })
      );
    }
  }, []);

  const onCompile = () => {
    setCompileLoading(true);
    if (data) {
      dispatch(
        fetchCompile.request({
          code,
          progLanguage: data?.quizzes?.prog_languages_id ?? "",
          onSuccess: (res) => {
            setCompileLoading(false);
            setOutput(res);
          },
          onFailure: (err) => {
            setCompileLoading(false);
            setOutput(err.message);
          },
        })
      );
    }
  };

  const onUpdate = () => {
    setLoading(true);
    nProgress.start();

    dispatch(
      putUpdateSubmission.request({
        data: {
          score: parseInt(score) ?? 0,
          feedback: feedback ?? "",
        },
        onFailure: () => {
          nProgress.done();
          setLoading(false);
        },
        onSuccess: () => {
          nProgress.done();
          history.replace("/vlab-admin/quizzes/update/" + quizId);
        },
        quizId,
        studentId,
      })
    );
  };

  return (
    <div className="p-6 mb-40">
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
              <div className="text-xl font-bold flex-1">Submission</div>
            </div>
            <div className="h-px bg-blueGray-200 dark:bg-blueGray-700 my-4" />
            <div>
              <div className="flex mt-2">
                <div className="flex-1 mr-4">
                  <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500">
                    Name
                  </div>
                  <div className="text-lg ">{data?.students?.name}</div>
                  <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                    NRP
                  </div>
                  <div className="text-lg ">{data?.students?.nrp}</div>
                  <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                    Class
                  </div>
                  <div className="text-lg ">
                    {data?.students?.classes?.kelas}{" "}
                    {data?.students?.classes?.program}{" "}
                    {data?.students?.classes?.jurusan}
                  </div>
                </div>
                <div className="flex-1 mr-4">
                  <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500">
                    Quiz Title
                  </div>
                  <div className="text-lg ">{data?.quizzes?.title}</div>
                  <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                    Submitted
                  </div>
                  <div>
                    {data?.is_submitted ? (
                      <i className="fas fa-check-square text-blue-600 dark:text-blue-400 text-lg cursor-pointer" />
                    ) : (
                      <i className="fas fa-square text-blueGray-200 dark:text-blueGray-700 text-lg cursor-pointer" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                    Submitted on
                  </div>
                  <div className="text-lg ">
                    {data?.time_submitted
                      ? moment(data.time_submitted).format("HH:mm DD MMMM YYYY")
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="h-px bg-blueGray-200 dark:bg-blueGray-700 my-4" />
              <div className="">
                <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                  Quiz Description
                </div>
                <pre className="prose dark:prose-light max-w-none font-body">
                  {data?.quizzes?.question}
                </pre>
              </div>
              <div className="mt-8">
                <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                  Student's Output
                </div>
                <article className="prose dark:prose-light max-w-none mt-2">
                  <pre>
                    <code>{data?.answer}</code>
                  </pre>
                </article>
              </div>
              <div className="mt-8">
                <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                  Code
                </div>
                <div className="h-80 border dark:border-blueGray-600">
                  <Editor
                    defaultLanguage="php"
                    defaultValue={code}
                    value={code}
                    onChange={(value) => setCode(value ?? "asd")}
                    theme={dark ? "vs-dark" : "light"}
                  />
                </div>
                <button
                  onClick={onCompile}
                  className="mt-2 mr-4 inline-flex items-center px-6 py-3 rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none ring-2"
                >
                  Run Code
                  <i className="fas fa-undo ml-4 mt-1" />
                </button>

                <article className="prose dark:prose-light max-w-none mt-8">
                  {!compileLoading ? (
                    output ? (
                      <>
                        <h4>Output</h4>
                        <pre>
                          <code>
                            <Parse html={output} />
                          </code>{" "}
                        </pre>
                      </>
                    ) : null
                  ) : (
                    <div className="h-40 flex justify-center items-center bg-">
                      {dark ? (
                        <HashLoader color="rgb(255, 255, 255)" size={40} />
                      ) : (
                        <HashLoader color="rgb(30, 64, 175)" size={40} />
                      )}
                    </div>
                  )}
                </article>
              </div>
              <div className="block text-gray-700 dark:text-gray-200 mt-8 mb-4">
                <span>Score</span>
                <Input
                  type="number"
                  placeholder="Score"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                />
              </div>
              <div className="block text-gray-700 dark:text-gray-200 mb-4">
                <span>Feedback</span>
                <TextArea
                  placeholder="Feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <Button
                disabled={!score || loading}
                onClick={onUpdate}
                className="w-full"
              >
                <i className="fas fa-save mr-4" /> Save
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Submission;
