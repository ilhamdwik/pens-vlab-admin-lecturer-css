/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";
import { getClasses } from "../../redux/actions/classesActions";
import {
  getStudentDetail,
  postCreateStudent,
  putUpdateStudent,
} from "../../redux/actions/studentsActions";
import { classes } from "../../types";

const Upsert = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = React.useState(id ? true : false);
  const [classesData, setClassesData] = React.useState<classes[]>([]);
  const [name, setName] = React.useState("");
  const [classID, setClassID] = React.useState("");
  const [nrp, setNrp] = React.useState("");

  React.useEffect(() => {
    nProgress.start();
    dispatch(
      getClasses.request({
        onSuccess: (res) => {
          nProgress.done();
          setClassesData(res);
          setClassID(res[0].id ?? "");
        },
        onFailure: () => {
          nProgress.done();
          toast.error("Terjadi Kesalahan");
          history.goBack();
        },
      })
    );

    if (id) {
      nProgress.start();
      dispatch(
        getStudentDetail.request({
          id,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Terjadi Kesalahan");
            history.replace("/admin/data/students");
          },
          onSuccess: (res) => {
            nProgress.done();
            setLoading(false);
            setName(res.name);
            setNrp(res.nrp);
            setClassID(res.class_id);
          },
        })
      );
    }
  }, []);

  const onCreate = () => {
    nProgress.start();
    setLoading(true);
    dispatch(
      postCreateStudent.request({
        data: {
          class_id: classID,
          name,
          nrp,
        },
        onSuccess: () => {
          nProgress.done();
          setLoading(false);
          toast.success("Data berhasil ditambahkan!");
          history.replace("/admin/data/students");
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
        putUpdateStudent.request({
          id,
          data: {
            class_id: classID,
            name,
            nrp,
          },
          onSuccess: () => {
            setLoading(false);
            toast.success("Data berhasil diubah!");
            history.replace("/admin/data/students");
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
                  history.goBack();
                }}
              >
                <i className="fas fa-arrow-left mr-4" /> Kembali
              </Button>
              <div className="text-xl font-bold">
                {id ? "Edit" : "Tambah"} Mahasiswa
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
              className="lg:w-1/3 flex flex-col"
            >
              {id ? null : (
                <div className="block text-gray-700 dark:text-gray-200 mb-4">
                  <span>NRP</span>
                  <Input
                    type="text"
                    placeholder="NRP"
                    value={nrp}
                    onChange={(e) => setNrp(e.target.value)}
                  />
                </div>
              )}

              <div className="block text-gray-700 dark:text-gray-200 mb-4">
                <span>Kelas</span>
                <DropDown
                  data={classesData.map((v) => ({
                    value: v.id ?? "",
                    name: `${v.kelas} ${v.jurusan}`,
                  }))}
                  onChange={(v) => setClassID(v)}
                />
              </div>
              <div className="block text-gray-700 dark:text-gray-200 mb-4">
                <span>Nama</span>
                <Input
                  type="text"
                  placeholder="Nama Mahasiswa"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <Button
                disabled={(id ? false : !nrp) || !name || loading}
                className=""
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
