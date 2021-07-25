import { useContext, useEffect, useState } from "react"
import UserContext from "./userContext";
import {useHistory} from "react-router-dom";

export default function UserCreate(){

    let userData = useContext(UserContext)

    let[firstName,setfirstName] = useState("");
    let[lastName,setlastName] = useState("");
    let[email,setemail] = useState("");
    let[password,setpassword] = useState("");
    let history = useHistory();

    let userSubmit = async (e) => {
        e.preventDefault()

        userData.setUserList([...userData.userList,{
            firstName,
            lastName,
            email,
            password
        }])
        await fetch("https://60fcf58d1fa9e90017c70d2b.mockapi.io/user",{
            method : "POST",
            body : JSON.stringify({
                firstName,
                lastName,
                email,
                password
            }),
            headers : {
                "Content-type" : "application/json"
            }
        });
        history.push("/users");
    }

    useEffect(() => {
        console.log("During Creation")
    },[]);

    useEffect(() => {
        return () => {
            console.log("During Destroy")
        }
    },[]);
    
    useEffect(() => {
        console.log("During the Props change")
    },[firstName])

    return <>
    
    <div className="container">
        <div className="row">
            <div className="col-lg-12">
                <h3>User Form</h3>
            </div>
        </div>
        
    <form onSubmit={userSubmit}>
        <div className="row">
        <div className="col-lg-6">
            <label>FirstName</label>
            <input className="form-control" value={firstName} onChange={(e) => setfirstName(e.target.value)}/>
        </div>
        <div className="col-lg-6">
            <label>LastName</label>
            <input className="form-control" value={lastName} onChange={(e) => setlastName(e.target.value)}/> 
        </div>
        </div>

        <div className="row">
        <div className="col-lg-6">
           <label>E-Mail</label>
           <input className="form-control" value={email} onChange={(e) => setemail(e.target.value)}/>
        </div>
        <div className="col-lg-6">
            <label>Password</label>
            <input className="form-control" value={password} onChange={(e) => setpassword(e.target.value)}/>
        </div>
        </div>

        <div className="row mt-3">
        <div className="col-lg-6">
            <input className="btn btn-primary" type="submit" value="Submit"/>
        </div>
        </div>

    </form>
    </div>

    </>
}