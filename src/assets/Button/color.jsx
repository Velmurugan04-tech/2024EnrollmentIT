import React,{useState} from "react";
function color(){
    const [color,setColor]=useState("#FFFFFF");
    function handle(event){
        setColor(event.target.value);
    }
    return(
        <div className="picker">
            <h1>Colour Picker</h1>
            <div className="display" style={{background: color}}>
                <p>Selected Color:{color}</p>
            </div>
            <label>Select a color</label>
            <input type="color" value={color} onChange={handle}></input>
        </div>
);
}
export default color