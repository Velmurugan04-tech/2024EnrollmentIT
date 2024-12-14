function UserGreeting(props){
    const m1=<h2>Welcome {props.username}</h2>
    const m2=<h2>Please Login  to continue</h2>
if(props.isLoggedIn){
    return m1
}
else{
    return m2
}
}
export default UserGreeting