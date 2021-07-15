/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import { quizzes } from "../../types";
import { getQuizzes } from "../../redux/actions/quizzesActions";
import moment from "moment";

const Quiz = () => {
  const [data, setData] = React.useState<quizzes[]>([]);
  const dispatch = useDispatch();

  const fetchData = () => {
    nProgress.start();
    dispatch(
      getQuizzes.request({
        onSuccess: (res) => {
          setData(res);
          nProgress.done();
        },
        onFailure: () => {
          nProgress.done();
        },
      })
    );
  };

  React.useEffect(fetchData, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6">
        <Card className="">
          <div>
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">Quiz</div>
              <Link to="/vlab-admin/quizzes/create">
                <Button>
                  <i className="fas fa-plus mr-4" /> New Quiz
                </Button>
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {data.map((v) => {
                const totalSubmitted = v.student_to_quiz?.filter(
                  (v) => v.is_submitted === true
                ).length;

                const isDone = totalSubmitted === v.student_to_quiz?.length;
                return (
                  <Link to={`/vlab-admin/quizzes/update/${v.id}`}>
                    <Card
                      className={`bg-blueGray-100 dark:bg-blueGray-900 shadow-none border-l-4 ${
                        isDone
                          ? "border-green-600 dark:border-green-400"
                          : "border-blue-600 dark:border-blue-400"
                      }  `}
                    >
                      <div>
                        {isDone ? (
                          <div className="flex">
                            <div className="text-xs bg-green-400 dark:bg-green-600 font-bold rounded mb-1 py-1 px-2">
                              Done
                            </div>
                          </div>
                        ) : null}

                        <div className="text-lg font-bold">{v.title}</div>
                        <div className="flex mt-2">
                          <div className="flex-1 mr-4">
                            <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500">
                              Date Created
                            </div>
                            <div>
                              {moment(v.createdAt).format("HH:mm DD MMMM YYYY")}
                            </div>
                          </div>
                          <div className="flex-1 mr-4">
                            <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500">
                              Assigned to Class
                            </div>
                            <div>{`${v.classes?.kelas} ${v.classes?.program} ${v.classes?.jurusan}`}</div>
                          </div>
                        </div>
                        <div className="flex mt-2">
                          <div className="flex-1 mr-4">
                            <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500">
                              Due Date
                            </div>
                            <div>
                              {moment(v.due_time).format("HH:mm DD MMMM YYYY")}
                            </div>
                          </div>
                          <div className="flex-1 mr-4">
                            <div className="text-xs font-bold text-blueGray-400 dark:text-blueGray-500">
                              Total Submitted
                            </div>
                            <div>
                              {totalSubmitted} out of{" "}
                              {v.student_to_quiz?.length}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
