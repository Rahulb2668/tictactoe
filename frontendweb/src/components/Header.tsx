import { useAuthStore } from "../store/authStore";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  return (
    <div className="h-30 w-full flex justify-between items-center ">
      <h1 className="font-semibold text-3xl ">Tic Tac Toe</h1>
      {isAuthenticated() ? (
        <div className="flex items-center gap-4">
          <h2>{user.email}</h2>
          <button className="bg-blue-500 px-4 py-2" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <a href="/login" className="bg-blue-500 px-4 py-2">
          Login
        </a>
      )}
    </div>
  );
};
export default Header;
