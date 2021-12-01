import React from "react";

/*
 * props = {
 *   labelText    (str, i.e. "Name")
 *   submitText   (str, i.e. "Update")
 *   type         (str, i.e. "text")
 *   name         (str, i.e. "name")
 *   placeholder  (str, i.e. "Name")
 *   value        (str, i.e. "John Doe")
 *   handleSubmit (func)
 * }
 */
function TxtBtnForm(props) {
  return (
    <form onSubmit={(e) => props.handleSubmit(e)} style={{ fontSize: 0 }}>
      <label style={{ fontSize: "1rem" }}>{props.labelText} </label>
      <input
        type={props.type}
        className="txt-btn-txt"
        name={props.name}
        placeholder={props.placeholder}
        defaultValue={props.value}
      />
      <button type={"submit"} className="txt-btn-btn">
        {props.submitText}
      </button>
    </form>
  );
}

function AccountInfo(props) {
  const LSUserData = JSON.parse(localStorage.getItem("userData"));

  async function updateName(e) {
    e.preventDefault();
    const name = e.target.name.value;
  }

  async function updateEmail(e) {
    e.preventDefault();
    const email = e.target.email.value;
  }

  return (
    <div id="account-info-page" className="usr-page">
      <h1>Account Info</h1>
      <TxtBtnForm
        labelText="Name:"
        submitText="Update"
        type="text"
        name="name"
        placeholder="Name"
        value={LSUserData.name}
        handleSubmit={updateName}
      />
      <br />
      <TxtBtnForm
        labelText="Email:"
        submitText="Update"
        type="email"
        name="email"
        placeholder="Email"
        value={LSUserData.email}
        handleSubmit={updateEmail}
      />
      <br />
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
