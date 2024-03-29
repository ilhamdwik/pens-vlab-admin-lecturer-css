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
import Editor from "@monaco-editor/react";
import Input from "../../components/Input";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = React.useState(false);
  const [score, setScore] = React.useState("");
  const [feedback, setFeedback] = React.useState("");

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setOutput(`${code}`)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [code])

  React.useEffect(() => {
    if (id) {
      nProgress.start();
      dispatch(
        getSubmissionDetail.request({
          onFailure: () => {
            nProgress.done();
            history.replace(`/lecturer/quizzez/${quizId}`);
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
          handleScore(parseInt(score));
          setLoading(false);
        },
        onSuccess: () => {
          nProgress.done();
          history.replace("/lecturer/quizzes/update/" + quizId);
        },
        quizId,
        studentId,
      })
    );
  };

  const handleScore = (score: number) => {
    if ((score > 100) || (score < 0))
      return toast.error("Score Invalid");
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
              <div className="text-xl font-bold flex-1">Working result</div>
            </div>
            <div className="h-px bg-blueGray-200 dark:bg-blueGray-700 my-4" />
            <div>
              <div className="flex mt-2">
                <div className="flex-1 mr-4">
                  <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500">
                    Name
                  </div>
                  <div className="text-base">{data?.students?.name}</div>
                  <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                    NRP
                  </div>
                  <div className="text-base">{data?.students?.nrp}</div>
                  <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                    Class
                  </div>
                  <div className="text-base">
                    {data?.students?.classes?.kelas}{" "}
                    {data?.students?.classes?.program}{" "}
                    {data?.students?.classes?.jurusan}
                  </div>
                </div>
                <div className="flex-1 mr-4">
                  <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500">
                    Name Quiz
                  </div>
                  <div className="text-base">{data?.quizzes?.title}</div>
                  <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                    Already Collected
                    {/* Sudah Dikumpulkan */}
                  </div>
                  <div>
                    {data?.is_submitted ? (
                      <i className="fas fa-check-square text-blue-600 dark:text-blue-400 text-lg cursor-pointer" />
                    ) : (
                      <i className="fas fa-square text-blueGray-200 dark:text-blueGray-700 text-lg cursor-pointer" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                    Collected on
                    {/* Dikumpulkan pada */}
                  </div>
                  <div className="text-base">
                    {data?.time_submitted
                      ? moment(data.time_submitted).format(
                          "HH:mm, DD MMMM YYYY"
                        )
                      : "-"}
                  </div>
                </div>
              </div>
              <div className="h-px bg-blueGray-200 dark:bg-blueGray-700 my-4" />
              <div className="">
                <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                  Description Quiz
                </div>
                <pre className="prose dark:prose-light max-w-none font-body">
                  {data?.quizzes?.question}
                </pre>
              </div>
              <div className="mt-8">
                <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500 mt-4">
                  Student Output
                  {/* Output dari Mahasiswa */}
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
                    defaultLanguage="html"
                    defaultValue={code}
                    value={code}
                    onChange={(value) => setCode(value ?? "asd")}
                    theme={dark ? "vs-dark" : "light"}
                  />
                </div>
                <article className="prose dark:prose-light max-w-none mt-8">
                  {output ? (
                      <>
                        <h4>Output Code</h4>
                        <iframe 
                          title="output"
                          className="p-4 bg-gray-200 dark:bg-white max-w-none overflow-y-scroll scrollbar scrollbar-thin rounded-md" style={{ width: "100%", height: "auto", borderColor: "rgb(0 0 0)" }}
                          srcDoc={output}
                        >
                        </iframe>
                      </>
                    ) : null}
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
