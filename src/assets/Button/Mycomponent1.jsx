import React,{useState} from "react";
function Mycomponent1(){
    const [name,setName]=useState("");
    const [quantity,setQuantity]=useState(5);
    const [comment,setComment]=useState("");
    const [payment,setPayment]=useState("");
    const [shipping,setShipping]=useState("");


    function handle(event){
        setName(event.target.value);
    }
    function handle1(event){
        setQuantity(event.target.value);
    }
    function handle2(event){
        setComment(event.target.value);
    }
    function handle3(event){
        setPayment(event.target.value);
    }
    function handle4(event){
        setShipping(event.target.value);
    }
    return(
        <div>
            <input value={name} onChange={handle}/>
            <p>Name:{name}</p>
            <input value={quantity} onChange={handle1} type="number"/>
            <p>Quantity:{quantity}</p>
            <textarea value={comment} onChange={handle2} placeholder="Enter Delievery instructions"/>
            <p>Comment:{comment}</p>
            <select value={payment} onChange={handle3}>
                <option value="">Select an option</option>
                <option value="Visa">Visa</option>
                <option value="Rupay">Rupay</option>
                <option value="MasterCard">MasterCard</option>
            </select>
            <p>Payment type:{payment}</p>
            <label>
                <input type="radio" value="Pick Up"
                checked={shipping==="Pick Up"}
                onChange={handle4}/>
                Pickup</label>
            <label>
            <input type="radio" value="Delivery"
                checked={shipping==="Delivery"}
                onChange={handle4}/>
                Delivery</label>
            <p>Shipping:{shipping}</p>
        </div>
);
}
export default Mycomponent1