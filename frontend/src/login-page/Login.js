import { useState } from "react";
import axios from "axios";
import settings from "../settings";

function Login(props) {
  const [validEmail, setValidEmail] = useState(null);

  async function login(email, setUserData) {
    //Make get req here when backend ready
    await axios
      .get(settings.URLBase.concat("/login/").concat(email.toString()))
      .then((response) => {
        let status = response.status;
        if (status === 201) {
          localStorage.setItem("userData", JSON.stringify(response.data));
          setUserData(response.data);
        } else {
          localStorage.removeItem("userData");
          setUserData(null);
        }
      })
      .catch((error) => {
        window.alert(error.toString());
      });
  }

  function checkLoggedIn() {
    if (localStorage.getItem("userData")) {
      return <span>Successfully Logged In</span>;
    }
    props.setUserData(null);
    return;
  }

  function checkValidEmail() {
    if (validEmail != null && !validEmail) {
      return <span>Invalid email, make sure it ends with "@calpoly.edu" </span>;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let endsWithCPEmail = email.endsWith("@calpoly.edu");
    let emailLongerThan0 = email.substr(0, email.indexOf("@")).length > 0;
    if (endsWithCPEmail && emailLongerThan0) {
      setValidEmail(true);
      login(email, props.setUserData);
    } else {
      setValidEmail(false);
    }
  }

  return (
    <div id="login-page">
      <form onSubmit={(e) => handleSubmit(e)} style={{ fontSize: 0 }}>
        <label>Email: </label>
        <input
          type={"text"}
          id={"login-email"}
          name={"email"}
          placeholder="username@calpoly.edu"
        />
        <button type={"submit"} id={"login-btn"}>
          Sign In
        </button>
      </form>
      <p>
        &emsp;
        {checkLoggedIn()}
        {checkValidEmail()}
      </p>
    </div>
  );
}

export default Login;
