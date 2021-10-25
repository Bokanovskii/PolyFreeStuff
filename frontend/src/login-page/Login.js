function Login(){
    return(
        <div>
            <form>
                <label>Email</label>
                <input type={"text"} id={"email"} name={"email"}/>
                <button type={"Submit"}>Sign In</button>
            </form>
        </div>
    )
}

export default Login;