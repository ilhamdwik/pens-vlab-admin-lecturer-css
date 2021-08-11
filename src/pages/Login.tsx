import nProgress from "nprogress";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as LogoText } from "../assets/images/logo-text.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import { postLogin, setToken } from "../redux/actions/authActions";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();

  const onLogin = () => {
    nProgress.start();
    setLoading(true);
    dispatch(
      postLogin.request({
        data: {
          pswd: password,
          email,
        },
        onSuccess: (res) => {
          nProgress.done();
          setLoading(false);
          dispatch(setToken(res.token));
          history.replace("/vlab-admin/home");
        },
        onFailure: () => {
          setLoading(false);
          nProgress.done();
          toast.error("Login failed");
        },
      })
    );
  };

  return (
    <div className="flex flex-col items-center lg:justify-center bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="lg:-mt-20">
        <LogoText className="w-60 h-36" />
      </div>
      <div className="flex items-center w-full">
        <div className="flex-1 h-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <main className="flex items-center justify-center p-6 sm:p-12 w-full">
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  onLogin();
                }}
              >
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200 text-center">
                  Login Admin
                </h1>
                <div className="block text-gray-700 dark:text-gray-400">
                  <span>Email</span>
                  <Input
                    type="email"
                    placeholder="john@doe.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="block text-gray-700 dark:text-gray-400 mt-4">
                  <span>Password</span>
                  <Input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button
                  className="mt-6"
                  disabled={loading || !email || !password}
                >
                  Log in
                </Button>
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
