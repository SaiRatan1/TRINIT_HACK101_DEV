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
    const [campdata,setCampdata] = useState([])
    let [obj1, setobj1] = useState([]);
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

    const getcampaigns = async()=>{
        const result = await fetch(`http://localhost:4000/api/ngo/${id}/campaigns`,{
            method:"GET",
            headers:{
                'content-type':'Application/json'
            }
        })
        const cres = await result.json()
        setCampdata(cres);
    }



    useEffect(()=>{
        fetchdata()
        getcampaigns()
    },[])


    let fun1 = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/api/campaign/create/${id}`, {
            method: "POST",
            body: JSON.stringify({
                name: document.getElementById('jumb1').value,
                description: document.getElementById('jumb2').value,
                endingTime: document.getElementById('jumb3').value,
                reqFund: document.getElementById('jumb4').value,
                paymentLink: document.getElementById('jumb5').value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(data => data.json()).then(data => {
            setCampdata([...campdata,data.campaign])
            console.log(campdata)
        });
    }

    return (
        <>
            <div className="container bg-dark text-white">
                <br />
                <div className="container bg-success text-dark">
                    <div id='backput'>
                        <img src="./i1.jpeg" alt="" />
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
                                    <Link to={`/groupchat/${data.group}`}><button className="btn m-1 btn-primary">JOIN GROUP</button></Link>
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
                                                <form className='was-validated' onSubmit={fun1}>
                                                    <div className="modal-body">
                                                        <div>
                                                            <h6>Enter the Campaign details:</h6>
                                                            <input type="text" id='jumb1' className="form-control" placeholder="Name" required></input>
                                                            <br />
                                                            <textarea className="form-control" id='jumb2' rows="5" placeholder='description' type="text"></textarea>
                                                            <br />
                                                            <input type="text" id='jumb3' className="form-control" placeholder="Ending time" required></input>
                                                            <br />
                                                            <input type="number" id='jumb4' className="form-control" placeholder="requiredfund" required></input>
                                                            <br />
                                                            <input type="text" id='jumb5' className="form-control" placeholder="Paymentlink" required></input>
                                                        </div>
                                                    </div>

                                                    <div className="modal-footer">
                                                        <button type="submit" className="btn btn-success" data-bs-dismiss="modal">ADD DETAIL</button>
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
                                        {campdata.map((rows,index)=>{
                                            return <Ele1 key ={ index+1 } nam={rows.name} endt={rows.endingTime} reqf={rows.reqFund} desc={rows.description} />
                                        })}
                                         
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