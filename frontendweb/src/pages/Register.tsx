import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, isAuthenticated } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated(), navigate]);

  const handleRegisterClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await register(email, password);
    if (res.success) {
      navigate("/", { replace: true });
    } else {
      alert(res.message);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        <form className="flex flex-col gap-4" onSubmit={handleRegisterClick}>
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
              Register
            </button>
            <a href="/login" className="bg-green-500 px-4 py-2">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
