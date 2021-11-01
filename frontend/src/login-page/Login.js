import {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

function Login(props){

    const [validEmail, setValidEmail] = useState(null);
    const history = useHistory();

    async function login (email, setEmail, setLoggedIn) {
        //Make get req here when backend ready
        await axios.get('http://localhost:5000/login/'.concat(email.toString()))
            .then((resonse) => {
                let status = resonse.status;
                if(status === 201){
                    console.log("Good login")
                    setEmail(email);
                    setLoggedIn(true);
                    history.push('/my-listings')
                }
            }
        ).catch((error) => {
            window.alert(error.toString());
            });
    }

    function checkLoggedIn(){
        console.log(props.email)
        if(props.loggedIn){
            return(<p>Successfully Logged In</p>)
        }
        return;
    }

    function checkValidEmail(){
        if(validEmail != null && !validEmail){
            return <p>Invalid email, make sure it ends with "@calpoly.edu" </p>
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
        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Email: </label>
                <input type={"text"} id={"email"} name={"email"}/>
                <button type ={"submit"}>Sign In</button>
            </form>
            {checkLoggedIn()}
            {checkValidEmail()}
        </div>
    )
}

export default Login;