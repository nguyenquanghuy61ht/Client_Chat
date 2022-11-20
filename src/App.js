import Chat from "./Features/Messages/Chat";
import { Routes, Route } from "react-router-dom";
import Register from "./Features/auth/component/RegisterForm/Register";
import Login from "./Features/auth/component/LoginForm/Login";
import ResetPass from "./Features/auth/component/ResetForm/ResetPass";
import FormNewPass from "./Features/auth/component/ResetForm/FormNewPass";
import { useSelector } from "react-redux";
import Protected from "./middleware/is-auth";
import SetAvatar from "./Features/Messages/component/SetAvatar";
import Video from "./Features/Messages/component/Video-Call";
function App() {
  const loggedInUser = useSelector((state) => state.user.current);
  let isAuth;
  if (
    JSON.stringify(loggedInUser) === "{}" 
  ) {
    isAuth = false;
  } else {
    isAuth = true;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="chat/*"
          element={
            <Protected isLoggedIn={isAuth}>
              <Chat />
            </Protected>
          }
        />
        <Route
          path="avartar"
          element={
            <Protected isLoggedIn={isAuth}>
              <SetAvatar />
            </Protected>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="sendemail" element={<ResetPass />} />
        <Route path="reset" element={<FormNewPass />} />
      </Routes>
    </div>
  );
}

export default App;
