import { useParams,useNavigate } from 'react-router-dom';
import "./Details.css";
import React, { useEffect, useState } from 'react';


import { IoMdArrowBack } from 'react-icons/io';
const Details = () => {
    const navigate = useNavigate();
    const { id } = useParams()
    const [singleUser, setSingleUser] = useState({})
    const dataUrl = "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
    useEffect(() => {
        fetch(dataUrl).then(response => response.json()).then(data => {
            const singleData = data.filter(data => data.id == id)
            setSingleUser(singleData[0])
        })
    }, [])
    const { age, city, company_name, email, first_name, last_name, state, web, zip } = singleUser
    return (
        <div className="singleData">
            {singleUser.first_name ? <div style={{ padding: "10px" }}>
                <h1 className="singleHeading"><IoMdArrowBack  onClick={() => navigate("/users")} style={{ cursor: "pointer" }} /> Details:{first_name + " " + last_name}</h1>
                <div className="details">
                    <p>First Name : <span style={{fontWeight: "bold",color:"#000"}}>{first_name}</span></p>
                    <p>Last Name : <span style={{fontWeight: "bold",color:"#000"}}>{last_name}</span></p>
                    <p>Company_name : <span style={{fontWeight: "bold",color:"#000"}}>{company_name}</span></p>
                    <p>City : <span style={{fontWeight: "bold",color:"#000"}}>{city}</span></p>
                    <p>State : <span style={{fontWeight: "bold",color:"#000"}}>{state}</span></p>
                    <p>Zip : <span style={{fontWeight: "bold",color:"#000"}}>{zip}</span></p>
                    <p>Email : <span style={{fontWeight: "bold",color:"#000"}}>{email}</span></p>
                    <p>Web : <span style={{fontWeight: "bold",color:"#000"}}><a href={web} target='_blank' rel="noreferrer" style={{color:"#000",textDecoration:"none"}}>{web}</a></span></p>
                    <p>Age : <span style={{fontWeight: "bold",color:"#000"}}>{age}</span></p>
                </div>
            </div>
                :
                <div>
                    loading...
                </div>}
        </div>

    );
};

export default Details;