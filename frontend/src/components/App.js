import "./App.scss";
import LoginPage from "./landingPage/login/Login";
import Register from "./landingPage/register/Register";

function App() {
  let user = true;

  return <div>{user ? <LoginPage /> : <Register />}</div>;
}

export default App;
