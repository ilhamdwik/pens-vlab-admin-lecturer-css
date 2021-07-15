/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import Input from "../../components/Input";
import {
  getClassDetail,
  postCreateClass,
  putUpdateClass,
} from "../../redux/actions/classesActions";

const UpsertClass = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = React.useState(id ? true : false);
  const [program, setProgram] = React.useState("");
  const [jurusan, setJurusan] = React.useState("");
  const [kelas, setKelas] = React.useState("");

  React.useEffect(() => {
    if (id) {
      nProgress.start();
      dispatch(
        getClassDetail.request({
          id,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Something went wrong");
            history.replace("/vlab-admin/data/classes");
          },
          onSuccess: (res) => {
            nProgress.done();
            setLoading(false);
            setProgram(res.program);
            setJurusan(res.jurusan);
            setKelas(res.kelas);
          },
        })
      );
    }
  }, []);

  const onCreate = () => {
    nProgress.start();
    setLoading(true);
    dispatch(
      postCreateClass.request({
        data: {
          jurusan,
          kelas,
          program,
        },
        onSuccess: () => {
          nProgress.done();
          setLoading(false);
          toast.success("Data created!");
          history.replace("/vlab-admin/data/classes");
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
        putUpdateClass.request({
          id,
          data: {
            jurusan,
            kelas,
            program,
          },
          onSuccess: () => {
            setLoading(false);
            toast.success("Data updated!");
            history.replace("/vlab-admin/data/classes");
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
                <i className="fas fa-arrow-left mr-4" /> Back
              </Button>
              <div className="text-xl font-bold">
                {id ? "Update" : "Create"} Class
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
              <div className="block text-gray-700 dark:text-gray-200 mb-4">
                <span>Kelas</span>
                <Input
                  type="text"
                  placeholder="Kelas"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                />
              </div>
              <div className="block text-gray-700 dark:text-gray-200 mb-4">
                <span>Program</span>
                <Input
                  type="text"
                  placeholder="Program"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                />
              </div>
              <div className="block text-gray-700 dark:text-gray-200 mb-8">
                <span>Jurusan</span>
                <Input
                  type="text"
                  placeholder="Jurusan"
                  value={jurusan}
                  onChange={(e) => setJurusan(e.target.value)}
                />
              </div>
              <Button
                disabled={!program || !kelas || !jurusan || loading}
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

export default UpsertClass;
