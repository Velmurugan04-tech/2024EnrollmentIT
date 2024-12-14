import React ,{useState} from 'react';
function mycomponent(){
    const [name,set]=useState("Guest");
    const update=()=>{
       set("Diva") ;
    }
    return (
        <div>
            <p>Name:{name}</p>
            <button onClick={update}>Set Name</button>
        </div>
    )
}
export default mycomponent