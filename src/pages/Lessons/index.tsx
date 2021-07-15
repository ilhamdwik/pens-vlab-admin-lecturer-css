/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import { Card } from "../../components/Card";
import Table from "../../components/Table";
import {
  deleteLesson,
  getLessonDetail,
  getLessons,
} from "../../redux/actions/lessonsActions";
import { submodules } from "../../types";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { baseUrl } from "../../apis";
import HashLoader from "react-spinners/ClipLoader";
import Markdown from "../../components/Markdown";

const Lessons = () => {
  const [data, setData] = React.useState<submodules[]>([]);

  const [viewDetailID, setViewDetailID] = React.useState("");
  const [detail, setDetail] = React.useState<submodules | undefined>();

  const dispatch = useDispatch();
  const [dataCount, setDataCount] = React.useState<number>();
  const [page, setPage] = React.useState<number>(1);

  const fetchData = (page?: number) => {
    nProgress.start();
    dispatch(
      getLessons.request({
        page: page ?? 1,
        onSuccess: (res, count) => {
          setData(res);
          setDataCount(count);
          nProgress.done();
        },
        onFailure: () => {
          nProgress.done();
        },
      })
    );
  };

  React.useEffect(() => {
    if (viewDetailID) {
      dispatch(
        getLessonDetail.request({
          id: viewDetailID,
          onSuccess: (res) => {
            setDetail(res);
          },
          onFailure: () => {
            setViewDetailID("");
            toast.error("Error fetching detail");
          },
        })
      );
    }
  }, [viewDetailID]);

  React.useEffect(fetchData, []);

  const onDelete = (id: string) => {
    Swal.fire({
      title: "Delete Data?",
      text: "Data will be deleted, are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        dispatch(
          deleteLesson.request({
            id: id,
            onSuccess: () => {
              toast.success("Data deleted!");
              fetchData();
            },
            onFailure: (err) => {
              toast.error(err);
            },
          })
        );
      }
    });
  };

  return (
    <div className="p-6">
      <Modal
        open={viewDetailID ? true : false}
        title="Lesson Detail"
        content={() => (
          <article className="  prose dark:prose-light max-w-none">
            {detail ? (
              <div>
                <h4>Content</h4>
                <Markdown markdown={detail?.contents ?? ""} />
                {detail.is_exercise ? (
                  <div className="mt-4">
                    <h4>Expected Output</h4>
                    <pre>
                      <code>{detail.submodule_exercises?.expected_output}</code>
                    </pre>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="h-10 flex justify-center items-center">
                <HashLoader color="rgb(30, 64, 175)" size={20} />
              </div>
            )}
          </article>
        )}
        buttons={[{ text: "OK" }]}
        onClose={() => {
          setViewDetailID("");
          setDetail(undefined);
        }}
      />
      <div className="grid grid-cols-1 gap-6">
        <Card className="">
          <div>
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">Lessons</div>
              <Link to="/vlab-admin/data/lessons/create">
                <Button>
                  <i className="fas fa-plus mr-4" /> New Lesson
                </Button>
              </Link>
            </div>
            <div className="mt-8">
              <Table
                pagination
                paginationCount={dataCount}
                currentPage={page}
                onChangePage={(selected) => {
                  setPage(selected);
                  setData([]);
                  fetchData(selected);
                }}
                columns={[
                  {
                    Header: "Module",
                    id: "prog_language",
                    Cell: ({ row }) => {
                      const v = row.original as submodules;
                      return (
                        <div className="flex items-center">
                          <img
                            src={
                              baseUrl + v.modules.prog_languages?.thumbnail_url
                            }
                            alt={v.modules.prog_languages.name}
                            className="h-10 w-10 object-cover mr-6 rounded overflow-hidden"
                          />
                          <div>{v.modules.title}</div>
                        </div>
                      );
                    },
                  },
                  { Header: "Order", accessor: "order" },
                  { Header: "Title", accessor: "title" },
                  {
                    Header: "Is Exercise",
                    id: "is_exercise",
                    Cell: ({ row }) => {
                      const v = row.original as submodules;
                      return (
                        <div className="flex items-center">
                          {v.is_exercise ? (
                            <i className="fas fa-check-square text-blue-600 dark:text-blue-400 text-lg" />
                          ) : (
                            <i className="fas fa-square text-blueGray-200 dark:text-blueGray-700 text-lg" />
                          )}
                        </div>
                      );
                    },
                  },

                  {
                    Header: "Actions",
                    id: "expander", // It needs an ID
                    Cell: ({ row }) => {
                      const id = (row.original as submodules).id;
                      return (
                        // Use Cell to render an expander for each row.
                        // We can use the getToggleRowExpandedProps prop-getter
                        // to build the expander.
                        <div className="row space-x-2 w-16 whitespace-nowrap ">
                          <Button onClick={() => setViewDetailID(id ?? "")}>
                            <i className="fas fa-eye" />
                          </Button>
                          <Link to={`/vlab-admin/data/lessons/update/${id}`}>
                            <Button>
                              <i className="fas fa-pencil-alt" />
                            </Button>
                          </Link>
                          <Button
                            onClick={() => {
                              if (id) {
                                onDelete(id);
                              }
                            }}
                          >
                            <i className="fas fa-trash" />
                          </Button>
                        </div>
                      );
                    },
                  },
                ]}
                data={data}
                renderRowSubComponent={() => {
                  return <div></div>;
                }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Lessons;
