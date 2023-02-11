import React from 'react';
import { useState, useEffect } from "react";
import { useLocation,Link } from 'react-router-dom';
function Ele1(props) {
    return (
        <>
            <div className="card border border-primary my-2">
                <div className="card-body">
                    NAME: {props.nam} <br />
                    ENDING TIME: {props.endt} <br />
                    REQUIRED FUND: {props.reqf} <br />
                    DESCRIPTION: <p className='container border border-'>
                        {props.desc}
                    </p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary">Donate</button>
                </div>
            </div>
        </>
    );
}

export default function Ngoprofile() {
    let [obj1, setobj1] = useState(<Ele1 />);
    const location = useLocation()
    const id = location.pathname.slice(7)
    // console.log(id)
    const [data,setData] = useState({})
    const fetchdata = async ()=>{
        const res = await fetch(`http://localhost:4000/api/ngo/${id}`,{
            method:"GET",

        })
        const data = await res.json()
        setData(data);
    }

    useEffect(()=>{
        fetchdata()
    },[])


    let fun1 = () => {
        fetch('/send_campaign_data', {
            method: "POST",
            body: JSON.stringify({
                form1: document.getElementById('jumb1').value,
                form2: document.getElementById('jumb2').value,
                form3: document.getElementById('jumb3').value,
                form4: document.getElementById('jumb4').value,
                form5: document.getElementById('jumb5').value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(data => data.json()).then(data => {
            let rows = data;
            let arr = [];
            for (let i = 0; i < arr.length; i++) {
                arr.push(<Ele1 nam={rows[i].name} endf={rows[i].endingtime} reqf={rows[i].requiredfund} desc={rows[i].description} />);
            }
            setobj1(arr);
        });
    }




    return (
        <>
            <div className="container bg-dark text-white">
                <br />
                <div className="container bg-success text-dark">
                    <div id='backput'>
                        <img src="" alt="" />
                    </div>
                    <span id='pubname'>{data.name}</span>
            
                </div>
                <br />
                <br />
                <br />
                <div className="container mt-5 text-dark">
                    <div className="row">

                        <div className="col-4">
                            <div className="container bg-white">
                                <div id="descap">
                                    <br />
                                    <button className="btn m-1 btn-success" data-bs-toggle="modal" data-bs-target="#myModal">ADD CAMPAIGN DETAILS</button><br />
                                    <button className="btn m-1 btn-primary">JOIN GROUP</button>
                                    <br />
                                    <Link to={`/ngo/${data._id}`}><button className="btn m-1 btn-info">INFO</button></Link>
                                    <br />
                                    <h5>Description:</h5>
                                    <div className="container bg-light border py-1">
                                        {data.description}
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-8 d-flex flex-column">
                            <div>
                                <div className="container bg-dark d-flex justify-content-center">
                                    
                                    <div className="modal" id="myModal">
                                        <div className="modal-dialog modal-sm">
                                            <div className="modal-content">

                                                <div className="modal-header">
                                                    <h4 className="modal-title">Donations</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <form className='was-validated'>
                                                    <div className="modal-body">
                                                        <div>
                                                            <h6>Enter the Campaign details:</h6>
                                                            <input type="text" id='jumb1' className="form-control" placeholder="Name" required></input>
                                                            <br />
                                                            <textarea className="form-control" id='jumb2' rows="5" placeholder='description' name="text"></textarea>
                                                            <br />
                                                            <input type="text" id='jumb3' className="form-control" placeholder="Ending time" required></input>
                                                            <br />
                                                            <input type="text" id='jumb4' className="form-control" placeholder="requiredfund" pattern='[0-9]+' required></input>
                                                            <br />
                                                            <input type="text" id='jumb5' className="form-control" placeholder="Paymentlink" required></input>
                                                        </div>
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={fun1}>ADD DETAIL</button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h5 className='text-white p-1'>CAMPAIGN DETAILS:</h5>
                                <div className="container bg-white">
                                    <div id='detailscam'>
                                        {obj1}
                                        {obj1}
                                        {obj1}
                                        {obj1}
                                        {obj1}
                                        {obj1}  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </>
    );
}