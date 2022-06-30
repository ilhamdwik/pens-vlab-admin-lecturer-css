import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import "../assets/styles/home.css";
// import { Card } from "../components/Card";
// import nProgress from "nprogress";
// import { getStudents } from "../redux/actions/studentsActions";
// import { students } from "../types";
// import { useDispatch } from "react-redux";

const Home = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  // const [data, setData] = React.useState<students[]>([]);
  // const dispatch = useDispatch();

  // React.useEffect = () => {
  //   nProgress.start();
  //   dispatch(
  //     getStudents.request({
  //       onSuccess: (res) => {
  //         setData(res);
  //         nProgress.done();
  //       },
  //       onFailure: () => {
  //         nProgress.done();
  //       },
  //     })
  //   );
  // };
  
  // React.useEffect(fetchData, []);
  
  // console.log(data)
  return (
    // <div className="p-6">
    //   <div className="grid grid-cols-1 gap-6">

    //     <Card className="bg-gradient-to-br dark:from-blue-900 dark:to-blue-800 from-blue-200 to-blue-100 shadow-none">
    //       <div>
    //         <div>Hallo, how are you ?</div>
    //         <div className="text-xl font-bold mt-px">{user?.name}</div>
    //       </div>
    //     </Card>
    //   </div>
    // </div>
    
    <div className="typing-animation">
      <div className="text-box">
          <h2>Hello <span className="user-name">{user?.name}</span></h2>
      </div>
    </div>
  );
};

export default Home;
