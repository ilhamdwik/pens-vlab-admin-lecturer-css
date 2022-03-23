import React from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";

export const DummyLogin = () => {
  const [, setCookie] = useCookies(["user"]);
  const history = useHistory();

  const onClickDummyLecturer = () => {
    setCookie(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTQ1NTQsIm5pcG5ycCI6IjIxMTAxNzEwMDkiLCJuYW1hIjoiU2hlcmx5IE1heWEgU2Fsc2FiaWxsYSIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2Mjk1NDU3NDl9.OdPGnlsjRxZzjnaWK0B_uDpbBI79oPsy-TFfiUgXAvU"
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTU4OTIsIm5pcG5ycCI6IjIxMTAxODEwMDciLCJuYW1hIjoiRG9zZW4gSWxoYW0iLCJoYWtBa3NlcyI6WyJkb3NlbiJdLCJpYXQiOjE2NDM3Njg1MTB9.95wOaq1CRuCHB156HL6V1cbMDNZwnQRFtzCSFfgxnFs"
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJmZGFjZDA0LTQ4ZjktNGI3OC1iMzUzLTRkNDcxODUzZjBiZCIsImNsYXNzX2lkIjoiZTdhMGVmODktMTk1ZS00OTJhLTlmNjYtZmY4MjdhN2QwZmVjIiwibmFtZSI6IklsaGFtIER3aSBLdXJuaWF3YW4iLCJuaXAiOiIyMjIwMTgxMDA3IiwiYXZhdGFyX3VybCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMi0wMy0xOFQwNTo1ODo1Ni45MDFaIiwidXBkYXRlZEF0IjoiMjAyMi0wMy0xOFQwNTo1ODo1Ni45MDFaIiwiaWF0IjoxNjQ4MDE0OTgzfQ.vPJh7FBjUMIEmBNR_-n6nkk1kVUg_MUF5aCH1HEBU2Q"
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6MTU4OTIsIm5pcG5ycCI6IjIxMTAxODEwMDciLCJuYW1hIjoiSWxoYW0gRHdpIEt1cm5pYXdhbiIsImhha0Frc2VzIjpbIm1haGFzaXN3YSJdLCJpYXQiOjE2NDM3Njg1MTB9.LdAfxDp6gomlkZL0mOeuKP3yn3zaFoPDj1RBFu1bqSo"
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21vciI6OTk5OTksIm5pcG5ycCI6IjIxMTAxNzEwMDkiLCJuYW1hIjoiRG9zZW4gU2hlcmx5IiwiaGFrQWtzZXMiOlsiZG9zZW4iXSwiaWF0IjoxNjI5NTQ1NzQ5fQ.o9sgUIkBeqZFJBpBmh28-Iz2KwD__xZHVX6ZWZG7nIE"
      );
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
