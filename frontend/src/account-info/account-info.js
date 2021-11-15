import React from "react";

function AccountInfo(props) {
  return (
    <div id="account-info-page" className="usr-page">
      <button
        id="logout"
        onClick={() => {
          props.logout();
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default AccountInfo;
