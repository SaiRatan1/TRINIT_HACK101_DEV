import React from 'react';
// import ReactDOM from 'react-dom/client';
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

function Ele1(props) {
    return (
        <>
            <div className="apper m-2 ">
                <div className="card">
                    <div className="card-header">{props.namer}</div>
                    <div className="card-body">{props.des}</div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-8">
                                <div className="d-flex bg-dark text-white p-2 justify-content-center">
                                    #{props.cat}
                                </div>
                            </div>
                            <div className="col-4">
                                <button className="btn btn-success">VISIT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function Searchpage() {
    let [obj1, setobj1] = useState([]);
    const location = useLocation()
    useEffect(() => {
        fetch(`http://localhost:4000/api/search/?query=${location.state.query}`).then(data => data.json()).then(data => {
            let rows = data;
            let arr = [];
            for (let i = 0; i < rows.length; i++) {
                arr.push(<Ele1 key={i} namer={rows[i].name} des={rows[i].description} cat={rows[i].category}></Ele1>);
            }
            setobj1(arr);
        });
    }, []);


    return (
        <>
            <div className="container bg-dark">
                <div className="d-flex flex-wrap justify-content-between bg-dark my-10" >
                    {obj1}
                </div>
            </div>
        </>
    );
}