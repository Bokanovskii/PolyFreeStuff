import React from "react";
import axios from "axios";
import settings from "../settings";

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
  const id = LSUserData._id;

  async function updateEmailCall(id, email){
      try{
          await axios.post(settings.URLBase.concat("/replace_user"), {
              "_id": id,
              "email": email
          })
      }
      catch (e){
          alert(e);
      }

  }

    async function updateNameCall(id, name){
        try{
            await axios.post(settings.URLBase.concat("/replace_user"), {
                "_id": id,
                "name": name
            })
        }
        catch (e){
            alert(e);
        }

    }

    function checkValidEmail(email){
        let endsWithCPEmail = email.endsWith("@calpoly.edu");
        let emailLongerThan0 = email.substr(0, email.indexOf("@")).length > 0;
        if (!endsWithCPEmail || !emailLongerThan0) {
            alert("Please enter a cal poly email address!")
            return false;
        }
        return true;
  }

  async function updateName(e) {
    //e.preventDefault();
    const name = e.target.name.value;
    await updateNameCall(id, name);
  }

  async function updateEmail(e) {
    //e.preventDefault();
    const email = e.target.email.value;
    if(checkValidEmail(email)){
        await updateEmailCall(id, email);
    }
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
