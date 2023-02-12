import React from 'react';
// import ReactDOM from 'react-dom/client';
import { useState, useEffect } from "react";
import { useLocation, Link } from 'react-router-dom';
const NewsCard = (props) => {
    return (
        <>
            <div className="card addpadding" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <a href={`${props.url}`} className="btn btn-primary">Read more..</a>
                </div>
            </div>
        </>
    )
}

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
                                <Link to={`/pages/${props.id}`}><button className="btn btn-success">VISIT</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export default function Homepgae() {
    const [newsarr, setNewsarr] = useState([])
    const tofetch = async () => {


        const res = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=NGO&api-key=4D1L8H6pwE8iRGcAXzywGgFKv2JVP94T`, {
            method: "GET"
        })
        const data = await res.json()
        setNewsarr(data.response.docs.slice(1,4));
        console.log(newsarr)
    }

    let [obj1, setobj1] = useState([]);


    const location = useLocation()

    useEffect(() => {

        fetch(`http://localhost:4000/api/search/?q=`).then(data => data.json()).then(data => {
            let rows = data.NGOS;
            let arr = [];
            for (let i = 0; i < rows.length; i++) {
                arr.push(<Ele1 key={i} namer={rows[i].name} des={rows[i].description} cat={rows[i].category} id={rows[i]._id}></Ele1>);
            }
            setobj1(arr);
        });
        tofetch();
    }, []);


    return (
        <div className='con'>
            <div className="row">
                <div className=" bg-dark checkw homeflex col-6 floatl">
                    <div className="d-flex flex-wrap justify-content-between bg-dark  checkw " >
                        {obj1}
                    </div>
                </div>
                
            </div>
            <div className="col-4 floatr">
                <h3 className='my-2'>News</h3>
                        {newsarr.map((item, key) => {
                            return <NewsCard key={key + 1} title={item.headline.main} description={item.lead_paragraph} url={item.web_url} />
                        })}
                    </div>
        </div>
    );
}