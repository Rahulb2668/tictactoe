import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isAuthenticated } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLoginClick = async (e: React.FormEvent<HTMLFormElement>) => {
    // console.log(e);
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      navigate("/", { replace: true });
    } else {
      alert(res.message);
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated(), navigate]);
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleLoginClick}>
          <input
            type="email"
            placeholder="Email Address"
            className="border-slate-500 border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password "
            className="border-slate-500 p-2 border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <button type="submit" className="bg-blue-500 px-4 py-2">
              Login
            </button>
            <a href="/register" className="bg-green-500 px-4 py-2">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
