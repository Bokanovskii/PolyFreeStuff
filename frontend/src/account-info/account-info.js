import React from "react";

function AccountInfo(props) {

    function logout() {
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        props.setId("");
        props.setEmail("");
        props.setLoggedIn(false);
    }

    function displayId() {
        console.log(props.id);
        if(props.id){
            return (<p>User Id: {props.id}</p>)
        }
    }

  return (
    <div id="account-info-page">
        {displayId()}
      <button
        id="logout"
        onClick={() => {
          logout();
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default AccountInfo;
