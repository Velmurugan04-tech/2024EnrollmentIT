import prof from './assets/a1.jpg'
function card(){
return(
    <div className="card">
        <img className="card-image" src={prof} alt="Profile" height={60}></img>
        <h2 className='title'>Divakar</h2>
        <p className='text'>Iam a coder and a anime watcher </p>
    </div>
);
}
export default card