/* eslint-disable react-hooks/exhaustive-deps */
import nProgress from "nprogress";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import { Card } from "../../components/Card";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import {
  getCourseDetail,
  postCreateCourse,
  putUpdateCourse,
} from "../../redux/actions/coursesActions";
import { useDropzone } from "react-dropzone";

const Upsert = () => {
  const { id } = useParams<{ id?: string }>();
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = React.useState(id ? true : false);
  const [courseID, setCourseID] = React.useState("");
  const [courseName, setCourseName] = React.useState("");
  const [courseDescription, setCourseDescription] = React.useState("");
  const [image, setImage] = React.useState<File>();
  const onDrop = React.useCallback((acceptedFiles: any[]) => {
    // Do something with the files
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxFiles: 1,
  });

  React.useEffect(() => {
    if (id) {
      nProgress.start();
      dispatch(
        getCourseDetail.request({
          id,
          onFailure: () => {
            nProgress.done();
            setLoading(false);
            toast.error("Something went wrong");
            history.replace("/admin/data/courses");
          },
          onSuccess: (res) => {
            nProgress.done();
            setLoading(false);
            setCourseName(res.name);
            setCourseDescription(res.description);
            setCourseID(res.id);
          },
        })
      );
    }
  }, []);

  const onCreate = () => {
    nProgress.start();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", courseName);
    formData.append("description", courseDescription);
    formData.append("id", courseID);
    formData.append("thumbnail", image as any);
    dispatch(
      postCreateCourse.request({
        data: formData,
        onSuccess: () => {
          nProgress.done();
          setLoading(false);
          toast.success("Data created!");
          history.replace("/admin/data/courses");
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
      const formData = new FormData();
      formData.append("name", courseName);
      formData.append("description", courseDescription);
      formData.append("id", courseID);
      formData.append("thumbnail", image as any);
      dispatch(
        putUpdateCourse.request({
          id,
          data: formData,
          onSuccess: () => {
            setLoading(false);
            toast.success("Data updated!");
            history.replace("/admin/data/courses");
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
                {id ? "Update" : "Create"} Course
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
                <span>Course Identifier (ID)</span>
                <Input
                  type="text"
                  placeholder="Course ID"
                  value={courseID}
                  onChange={(e) => setCourseID(e.target.value)}
                />
              </div>
              <div className="block text-gray-700 dark:text-gray-200 mb-4">
                <span>Course Name</span>
                <Input
                  type="text"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <div className="block text-gray-700 dark:text-gray-200 mb-4">
                <span>Course Description</span>
                <TextArea
                  placeholder="Course Description"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
              </div>
              <div
                className="block text-gray-700 dark:text-gray-200 mb-8"
                {...getRootProps()}
              >
                <label>Course Thumbnail</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-blueGray-600 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <input {...getInputProps()} />
                    <div className="flex text-sm text-gray-600 dark:text-blueGray-200">
                      {isDragActive ? (
                        <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                          <span>Drop the file here</span>
                        </label>
                      ) : (
                        <>
                          <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-blueGray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {image ? (
                  <img
                    alt="preview"
                    className="h-20 w-20 object-cover mt-2 rounded overflow-hidden"
                    src={URL.createObjectURL(image)}
                  />
                ) : null}
              </div>

              <Button
                disabled={
                  !courseName ||
                  !courseID ||
                  !courseDescription ||
                  !image ||
                  loading
                }
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
