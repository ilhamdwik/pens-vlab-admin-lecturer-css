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
  getRoleDetail,
  postCreateRole,
  putUpdateRole,
} from "../../redux/actions/rolesActions";

const Upsert = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = React.useState(id ? true : false);
  const [roleName, setRoleName] = React.useState("");

  React.useEffect(() => {
    if (id) {
      nProgress.start();
      dispatch(
        getRoleDetail.request({
          id,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Something went wrong");
            history.replace("/vlab-admin/data/roles");
          },
          onSuccess: (res) => {
            nProgress.done();
            setLoading(false);
            setRoleName(res.role_name);
          },
        })
      );
    }
  }, []);

  const onCreate = () => {
    nProgress.start();
    setLoading(true);
    dispatch(
      postCreateRole.request({
        data: {
          role_name: roleName,
        },
        onSuccess: () => {
          nProgress.done();
          setLoading(false);
          toast.success("Data created!");
          history.replace("/vlab-admin/data/roles");
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
        putUpdateRole.request({
          id,
          data: {
            role_name: roleName,
          },
          onSuccess: () => {
            setLoading(false);
            toast.success("Data updated!");
            history.replace("/vlab-admin/data/roles");
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
                {id ? "Update" : "Create"} Role
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
                <span>Role Name</span>
                <Input
                  type="text"
                  placeholder="Role Name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
              </div>

              <Button disabled={!roleName || loading} className="">
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
