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
  getLecturerDetail,
  postCreateLecturer,
  putUpdateLecturer,
} from "../../redux/actions/lecturersActions";

const Upsert = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = React.useState(id ? true : false);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [nip, setNip] = React.useState("");
  const [position, setPosition] = React.useState("");

  React.useEffect(() => {
    if (id) {
      nProgress.start();
      dispatch(
        getLecturerDetail.request({
          id,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Something went wrong");
            history.replace("/admin/data/lecturers");
          },
          onSuccess: (res) => {
            nProgress.done();
            setLoading(false);
            setName(res.name);
            setNip(res.nip);
            setPosition(res.position);
          },
        })
      );
    }
  }, []);

  const onCreate = () => {
    nProgress.start();
    setLoading(true);
    dispatch(
      postCreateLecturer.request({
        data: {
          name,
          nip,
          email,
          position,
        },
        onSuccess: () => {
          nProgress.done();
          setLoading(false);
          toast.success("Data created!");
          history.replace("/admin/data/lecturers");
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
        putUpdateLecturer.request({
          id,
          data: {
            name,
            nip,
            email,
            position,
          },
          onSuccess: () => {
            setLoading(false);
            toast.success("Data updated!");
            history.replace("/admin/data/lecturers");
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
                {id ? "Update" : "Create"} Lecturer
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
                  <span>Email</span>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
              <div className="block text-gray-700 dark:text-gray-200 mb-4">
                <span>NIP</span>
                <Input
                  type="text"
                  placeholder="NIP"
                  value={nip}
                  onChange={(e) => setNip(e.target.value)}
                />
              </div>

              <div className="block text-gray-700 dark:text-gray-200 mb-4">
                <span>Name</span>
                <Input
                  type="text"
                  placeholder="Lecturer Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="block text-gray-700 dark:text-gray-200 mb-4">
                <span>Position</span>
                <Input
                  type="text"
                  placeholder="Position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>

              <Button
                disabled={(id ? false : !email) || !name || !nip || loading}
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
