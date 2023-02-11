import React, { useState } from 'react'
import {useEffect} from 'react'
import { Link } from 'react-router-dom';
import Profile from './profile.jpeg';
import CredContext from './context/Credentials/credContext'

import { useLocation } from 'react-router-dom'


const Ngodata = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('id');

    const [ngodata,setNgodata] = useState({})
    const details =async  ()=>{
        const res = await fetch(`http://localhost:4000/api/ngo/${id}`,{
            method:"GET"
        })
        const data = await res.json();
        if(!data || res.status===500){
            console.log('couldnt get ngo data')
        }
        else{
            setNgodata(data);
        }
    }

    useEffect(()=>{
        details();
    },[])

    return (
        <>
            <div className="ngodata">
                {/* <div className="profile">
                    <img src={Profile} alt=" " />
                </div> */}
                <div className="ngod1">
                    <div className="four">
                        <div className="d1"><p>Name:</p><label className="borderbot" htmlFor="">{ngodata.name}</label></div>
                        <div className="d2"><p>Email:</p><label className="borderbot" htmlFor="">{ngodata.email}</label></div>

                        <div className="d3"><p>Phone:</p><label className="borderbot" htmlFor="">{ngodata.phoneNumber}</label></div>
                        {ngodata.socialLinks &&  ngodata.socialLinks.map((e,index)=>{
                            return <><div className="d5"><p>Social Media link {index+1}: </p><label className="borderbot" htmlFor="">e</label></div></>
                        })}
                        {/* <div className="d4"><p>Social Media link1: </p><label className="borderbot" htmlFor="">{ngodata.socialLinks.join(' , ')}</label></div> */}
                        {/* <div className="d5"><p>Social Media link2: </p><label className="borderbot" htmlFor="">Lorem ipsum </label></div> */}
                        <div className="d4"><p>Category: </p><label className="borderbot" htmlFor="">{ngodata.category}</label></div>
                    </div>
                    <div className="next">
                        
                        <div className="d5"><p>Registration Number: </p><label className="borderbot" htmlFor="">{ngodata.regNo}</label></div>
                        <div className="d6"><p>Pancard Number: </p><label className="borderbot" htmlFor="">{ngodata.panNo} </label></div>
                        <div className="d4"><p>Type: </p><label className="borderbot" htmlFor="">{ngodata.typeOfNGO}</label></div>

                        <div className="d4"><p>Payment Info: </p><label className="borderbot" htmlFor="">{ngodata.paymentUPI}</label></div>
                    </div>
                    <div className="des1">
                        <div className="d4"><p>Description:</p>

                            <p className='pofrecent'>{ngodata.description}</p></div>
                    </div>
                    <div className="des2">
                        <div className="d4"><p>Recent Activity:</p>
                            <p className='pofrecent'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea optio velit aliquid dolor aliquam illo quis numquam eligendi sed cumque.</p></div>
                    </div>
                </div>
                <Link to="/Donation">
                    <button className="but1" type="submit">Donate</button>
                </Link>
                <Link to={`/grouppage/${ngodata.group}`}>
                    <button className="but2" type="submit">Join group</button>
                </Link>

            </div>
        </>
    )
}

export default Ngodata
