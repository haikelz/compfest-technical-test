import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { ChildrenProps } from "../types";

export default function Login() {
  return (
    <LoginRoute>
      <div>
        <div>
          <button>Login</button>
        </div>
      </div>
    </LoginRoute>
  );
}

function LoginRoute({ children }: ChildrenProps) {
  return (
    <>{Cookies.get("token") !== undefined ? <Navigate to="/" /> : children}</>
  );
}
