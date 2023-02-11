import React from 'react';
// import ReactDOM from 'react-dom/client';
import { useState, useEffect } from "react";
import './searchpage.css'


function Ele1(props) {
  return (
    <>
      <div className="apper m-2 ">
        <div class="card">
          <div class="card-header">{props.namer}</div>
          <div class="card-body">{props.des}</div>
          <div class="card-footer">
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
  let [obj1, setobj1] = useState({});
  useEffect(() => {
    fetch('/mong').then(data => data.json()).then(data => {
      let rows = data;
      let arr = [];
      for (let i = 0; i < rows.length; i++) {
        arr.push(<Ele1 namer={rows[i].namer} des={rows[i].des} cat={rows[i].cat}></Ele1>);
      }
      setobj1(arr);
    });
  }, []);
  return (
    <>
      <div className="container bg-dark">
        <div className="d-flex flex-wrap justify-content-between bg-dark">
          {obj1}
        </div>
      </div>
    </>
  );
}