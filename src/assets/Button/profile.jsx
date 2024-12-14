function Profile(){
const imageURL='./src/assets/a1.jpg';
const handleClick = (e)=> e.target.style.display="none";
return (<img onClick={(e)=> handleClick(e)} src={imageURL}></img>)
}
export default Profile