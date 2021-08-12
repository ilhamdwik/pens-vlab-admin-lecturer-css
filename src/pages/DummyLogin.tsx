import React from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";

export const DummyLogin = () => {
  const [, setCookie] = useCookies(["user"]);
  const history = useHistory();

  const onClickDummyLecturer = () => {
    localStorage.setItem(
      "userCas",
      `{"email":"sherlymaya@it.lecturer.pens.ac.id","nrp":null,"nip":"2110171009"}`
    );
    setCookie("user", {
      id: 14554,
      nip: "2110171009",
      name: "Sherly Maya Salsabilla",
      kelas: 4,
      program: "D4",
      jurusan: "Teknik Informatika",
      image: "https://ethol.pens.ac.id/api/images/user.png",
      role: 1,
      chat_id: "5e93bf7e159747618add175c",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQ1NTQsIm5ycCI6IjIxMTAxNzEwMDkiLCJuYW1lIjoiU2hlcmx5IE1heWEgU2Fsc2FiaWxsYSIsImtlbGFzIjo0LCJwcm9ncmFtIjoiRDQiLCJqdXJ1c2FuIjoiVGVrbmlrIEluZm9ybWF0aWthIiwiaW1hZ2UiOiJodHRwczovL2V0aG9sLnBlbnMuYWMuaWQvYXBpL2ltYWdlcy91c2VyLnBuZyIsInJvbGUiOjIsImNoYXRfaWQiOiI1ZTkzYmY3ZTE1OTc0NzYxOGFkZDE3NWMiLCJpYXQiOjE2MjI1MjY3NTV9.jcjKW3ngCACQFXSw4_A7CUrWBN0gA15lZ-puFMIosGI",
    });
    history.replace("/admin");
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-blue-50 justify-center items-center">
      <button
        onClick={onClickDummyLecturer}
        className="bg-blue-600 hover:bg-blue-800 transition text-white py-2 px-4 rounded"
      >
        Login as Lecturer
      </button>
    </div>
  );
};

export default DummyLogin;
