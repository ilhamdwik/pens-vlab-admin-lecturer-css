/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import Table from "../../components/Table";
import {
  getStudentDetail,
  getStudents,
} from "../../redux/actions/studentsActions";
import { students } from "../../types";
import Modal from "../../components/Modal";
import HashLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { formatName } from "../../utils/formatter";
import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const StudentsLecturer = () => {
  const [data, setData] = React.useState<students[]>([]);
  const dispatch = useDispatch();
  const [dataCount, setDataCount] = React.useState<number>();
  const [page, setPage] = React.useState<number>(1);
  const [viewDetailID, setViewDetailID] = React.useState("");
  const [detail, setDetail] = React.useState<students | undefined>();
  const [studentProgress, setStudentProgress] = React.useState<number>();
  const progress = studentProgress as number;

  const fetchData = (page?: number) => {
    nProgress.start();
    dispatch(
      getStudents.request({
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
        getStudentDetail.request({
          id: viewDetailID,
          onSuccess: (res, studentProgress) => {
            setDetail(res);
            setStudentProgress(studentProgress);
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

  return (
    <div className="p-6">
      <Modal
        open={viewDetailID ? true : false}
        title="Detail Progress Student"
        content={() => (
          <>
          <div className="flex my-8">
            {detail ? (
              <>
              <div className="flex-1 mx-8">
                <div className="text-base font-bold text-lightBlue-600">
                  Nama
                </div>
                {formatName(detail.name ?? "")}
                <div className="text-base font-bold text-lightBlue-600 mt-4">
                  NRP
                </div>
                {detail.nrp}
              </div>
              <div className="flex-1">
                <div className="text-base font-bold text-lightBlue-600">
                  Kelas
                </div>
                {detail.classes?.kelas}
                <div className="text-base font-bold text-lightBlue-600 mt-4">
                  Program
                </div>
                {detail.classes?.program}
              </div>
              </>
            ) : (
              <div className="h-10 flex justify-center items-center">
              <HashLoader color="rgb(30, 64, 175)" size={20} />
              </div>
            )}
          </div>
          <div className="mx-8">
            <div className="text-base font-bold text-lightBlue-600">
              Student Progress
            </div>
            {studentProgress?.toFixed(0)}%
            <div className="">
              <div className="h-36 text-xs flex">
              <CircularProgressbar
                value={progress}
                text={`${studentProgress}%`}
                styles={buildStyles({
                  textColor: "text-lightBlue-600",
                  // pathColor: "text-lightBlue-600",
                  // trailColor: "text-lightBlue-600"
                })}
              />
              </div>
            </div>
          </div>
          </>
        )}
        buttons={[{ text: "Cancel" }]}
        onClose={() => {
          setViewDetailID("");
          setDetail(undefined);
        }}
      />
      <div className="grid grid-cols-1 gap-6">
        <Card className="">
          <div>
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">Progress Mahasiswa</div>
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
                    Header: "NRP",
                    id: "nrp",
                    Cell: ({ row }) => {
                      const v = row.original as students;
                      return v.nrp;
                    },
                  },
                  { Header: "Nama", accessor: "name" },
                  {
                    Header: "Kelas",
                    id: "class",
                    Cell: ({ row }) => {
                      const v = row.original as students;
                      return `${v.classes?.kelas} ${v.classes?.jurusan}`;
                    },
                  },

                  {
                    Header: "Action",
                    id: "expander", // It needs an ID
                    Cell: ({ row }) => {
                      const id = (row.original as students).id;
                      return (
                        // Use Cell to render an expander for each row.
                        // We can use the getToggleRowExpandedProps prop-getter
                        // to build the expander.
                        <div className="row space-x-2 w-16 whitespace-nowrap">
                          {/* <Button {...row.getToggleRowExpandedProps()}>
                    <i className="fas fa-eye" />
                  </Button> */}
                          <Button onClick={() => setViewDetailID(id ?? "")}>
                            <i className="fas fa-eye" />
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

export default StudentsLecturer;
