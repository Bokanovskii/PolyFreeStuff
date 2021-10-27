import './index.css';
import './App.css';
import {useState} from "react";

import Login from "./login-page/Login"

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <div className="App">
      <Login
          email={email} setEmail={setEmail}
          loggedIn={loggedIn} setLoggedIn={setLoggedIn}
      />
    </div>
  );
}

export default App;
