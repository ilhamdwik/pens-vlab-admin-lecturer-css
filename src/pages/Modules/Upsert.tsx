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
import {
  getCourseDetail,
  getCourses,
} from "../../redux/actions/coursesActions";
import {
  getModuleDetail,
  postCreateModule,
  putUpdateModule,
} from "../../redux/actions/modulesActions";
import { modules, prog_languages } from "../../types";

const Upsert = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = React.useState(id ? true : false);
  const [courses, setCourses] = React.useState<prog_languages[]>([]);
  const [courseID, setCourseID] = React.useState("");
  const [modulesInCourse, setModulesInCourse] = React.useState<modules[]>([]);
  const [title, setTitle] = React.useState("");
  const [overview, setOverview] = React.useState("");
  const [order, setOrder] = React.useState<number>(0);

  React.useEffect(() => {
    nProgress.start();
    dispatch(
      getCourses.request({
        onSuccess: (res) => {
          nProgress.done();
          setCourses(res);
          setCourseID(res[0].id);
        },
        onFailure: () => {
          nProgress.done();
          setLoading(false);
          toast.error("Something went wrong");
          history.replace("/vlab-admin/data/modules");
        },
      })
    );

    if (id) {
      nProgress.start();
      dispatch(
        getModuleDetail.request({
          id,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Something went wrong");
            history.replace("/vlab-admin/data/modules");
          },
          onSuccess: (res) => {
            nProgress.done();
            setLoading(false);
            setTitle(res.title);
            setOverview(res.overview);
            setOrder(res.order);
            setCourseID(res.prog_languages_id);
          },
        })
      );
    }
  }, []);

  React.useEffect(() => {
    if (courseID) {
      nProgress.start();
      dispatch(
        getCourseDetail.request({
          id: courseID,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Something went wrong");
          },
          onSuccess: (res) => {
            if (res.modules) {
              nProgress.done();

              setModulesInCourse(res.modules);
            }
          },
        })
      );
    }
  }, [courseID]);

  const onCreate = () => {
    nProgress.start();
    setLoading(true);
    dispatch(
      postCreateModule.request({
        data: {
          order,
          overview,
          title,
          prog_languages_id: courseID,
        },
        onSuccess: () => {
          nProgress.done();
          setLoading(false);
          toast.success("Data created!");
          history.replace("/vlab-admin/data/modules");
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
        putUpdateModule.request({
          id,
          data: {
            order,
            overview,
            title,
            prog_languages_id: courseID,
          },
          onSuccess: () => {
            setLoading(false);
            toast.success("Data updated!");
            history.replace("/vlab-admin/data/modules");
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
                {id ? "Update" : "Create"} Module
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
              className="flex space-x-6"
            >
              <div className="flex-1 lg:w-1/3 flex flex-col">
                <div className="block text-gray-700 dark:text-gray-200 mb-4">
                  <span>Course</span>
                  <DropDown
                    data={courses.map((v) => ({ value: v.id, name: v.name }))}
                    onChange={(v) => setCourseID(v)}
                  />
                </div>
                <div className="block text-gray-700 dark:text-gray-200 mb-4">
                  <span>Modules in Course</span>
                  <div className="flex space-x-4 font-bold-bold p-2 dark:bg-blueGray-700 bg-blueGray-100 mt-2 divide-gray-700">
                    <div className="w-12">Order</div>
                    <div className="flex-1">Title</div>
                  </div>
                  {modulesInCourse.map((v) => (
                    <div className="flex space-x-4 p-2">
                      <div className="w-12">{v.order}</div>
                      <div className="flex-1">{v.title}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 lg:w-1/3 flex flex-col">
                <div className="block text-gray-700 dark:text-gray-200 mb-4">
                  <span>Title</span>
                  <Input
                    type="text"
                    placeholder="Module Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="block text-gray-700 dark:text-gray-200 mb-4">
                  <span>Overview</span>
                  <Input
                    type="text"
                    placeholder="Module Overview"
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                  />
                </div>
                <div className="block text-gray-700 dark:text-gray-200 mb-4">
                  <span>Order</span>
                  <Input
                    type="number"
                    placeholder="Module Order"
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value))}
                  />
                </div>

                <Button
                  disabled={
                    !title || !overview || !order || !courseID || loading
                  }
                  className=""
                >
                  <i className="fas fa-save mr-4" /> Save
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Upsert;
