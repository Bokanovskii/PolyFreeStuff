function Login(props){

    async function login(setEmail, setLoggedIn) {
        //Make post req here when backend ready
        setEmail("evanwitulski@gmail.com");
        //If backend says user already exists, set logged in.
        //setLoggedIn(true);
    }

    function checkLoggedIn(){
        console.log(props.loggedIn)
        if(props.loggedIn){
            return(<p>Successfully Logged In</p>)
        }
        return;
    }

    return(
        <div>
            <form>
                <label>Email</label>
                <input type={"text"} id={"email"} name={"email"}/>
                <button type={"Submit"} onSubmit={login(props.setEmail, props.setLoggedIn)}>Sign In</button>
            </form>
            {checkLoggedIn()}
        </div>
    )
}

export default Login;