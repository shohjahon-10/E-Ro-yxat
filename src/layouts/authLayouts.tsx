import { Outlet } from "react-router-dom";
import App from "../App";

export const AuthLayout = () => {
  return (
    <App>
      <div className="text-black dark:text-white-dark min-h-screen">
        {<Outlet />}
      </div>
    </App>
  );
};
