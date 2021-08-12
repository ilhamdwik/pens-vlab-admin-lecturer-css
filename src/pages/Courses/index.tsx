/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import Table from "../../components/Table";
import { deleteCourse, getCourses } from "../../redux/actions/coursesActions";
import { prog_languages } from "../../types";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { baseUrl } from "../../apis";

const Courses = () => {
  const [data, setData] = React.useState<prog_languages[]>([]);
  const dispatch = useDispatch();
  const [dataCount, setDataCount] = React.useState<number>();
  const [page, setPage] = React.useState<number>(1);

  const fetchData = (page?: number) => {
    nProgress.start();
    dispatch(
      getCourses.request({
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
          deleteCourse.request({
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
      <div className="grid grid-cols-1 gap-6">
        <Card className="">
          <div>
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">Courses</div>
              <Link to="/admin/data/courses/create">
                <Button>
                  <i className="fas fa-plus mr-4" /> New Course
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
                    Header: "Thumbnail",
                    id: "thumbnail_url",
                    Cell: ({ row }) => {
                      const v = row.original as prog_languages;

                      return (
                        <div>
                          <a
                            href={baseUrl + v.thumbnail_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={baseUrl + v.thumbnail_url}
                              alt={v.name}
                              className="h-20 w-20 object-cover"
                            />
                          </a>
                        </div>
                      );
                    },
                  },
                  {
                    Header: "Name",
                    id: "name",
                    Cell: ({ row }) => {
                      const v = row.original as prog_languages;

                      return (
                        <div className="max-w-md lg:max-w-xl break-words whitespace-pre-line inline-block">
                          <div className="text-lg font-bold mb-2">{v.name}</div>
                          {v.description}
                        </div>
                      );
                    },
                  },

                  {
                    Header: "Actions",
                    id: "expander", // It needs an ID
                    Cell: ({ row }) => {
                      const id = (row.original as prog_languages).id;
                      return (
                        // Use Cell to render an expander for each row.
                        // We can use the getToggleRowExpandedProps prop-getter
                        // to build the expander.
                        <div className="row space-x-2 w-16 whitespace-nowrap">
                          {/* <Button {...row.getToggleRowExpandedProps()}>
                    <i className="fas fa-eye" />
                  </Button> */}
                          <Link to={`/admin/data/courses/update/${id}`}>
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

export default Courses;
