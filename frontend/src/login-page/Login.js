import {useState} from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

function Login(props){

    const [validEmail, setValidEmail] = useState(null);
    let history = useHistory();

    async function login (email, setEmail, setLoggedIn) {
        //Make get req here when backend ready
        await axios.get('http://localhost:5000/login/'.concat(email.toString()))
            .then((resonse) => {
                let status = resonse.status;
                if(status === 201){
                    console.log("Good login")
                    setEmail(email);
                    setLoggedIn(true);
                    history.push('/');
                }
            }
        ).catch((error) => {
            window.alert(error.toString());
            });
    }

    function checkLoggedIn(){
        console.log(props.email)
        if(props.loggedIn){
            history.push('/');
            return(<span>Successfully Logged In</span>);
        }
        return;
    }

    function checkValidEmail(){
        if(validEmail != null && !validEmail){
            return <span>Invalid email, make sure it ends with "@calpoly.edu" </span>
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        let email = e.target.email.value;
        let endsWithCPEmail = email.endsWith("@calpoly.edu");
        let emailLongerThan0 = email.substr(0, email.indexOf('@')).length > 0;
        if(endsWithCPEmail && emailLongerThan0){
            setValidEmail(true);
            login(email, props.setEmail, props.setLoggedIn);
        } else {
            setValidEmail(false);
        }
    }

    return(
        <div id="login-page">
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Email: </label>
                <input type={"text"} id={"login-email"} name={"email"} placeholder="username@calpoly.edu" />
                <button type={"submit"} id={"login-btn"}>Sign In</button>
            </form>
            <p>&emsp;
                {checkLoggedIn()}
                {checkValidEmail()}
            </p>
        </div>
    );
}

export default Login;