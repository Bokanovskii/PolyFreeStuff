import {useState} from "react";

function Login(props){

    const [validEmail, setValidEmail] = useState(null);

    function login (email, setEmail, setLoggedIn) {
        //Make post req here when backend ready
        setEmail(email);
        //If backend says user already exists, set logged in.
        setLoggedIn(true);
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
        if(email.endsWith("@calpoly.edu")){
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