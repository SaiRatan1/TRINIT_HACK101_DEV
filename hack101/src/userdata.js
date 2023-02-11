import React, { useEffect, useState } from 'react'
import Profile from './profile.jpeg';
const Userdata = () => {
    const [userdata,setUserdata] = useState({})
    const details =async  ()=>{
        const res = await fetch(`http://localhost:4000/api/auth/user/63e6b2e13485912eaa3f2f95`,{
            method:"GET"
        })
        const data = await res.json();
        if(!data || res.status===500){
            console.log('couldnt get ngo data')
        }
        else{
            setUserdata(data);
        }
    }

    useEffect(()=>{
        details();
    },[])


    return (
        <>
            <div className="userdata">
                <div className="profile">
                    <img src={Profile} alt=" " />
                </div>
                <div className="data">
                    <div className="d1"><p>Name: </p><label className="borderbot" htmlFor="">{userdata.name}</label></div>
                    <div className="d2"><p>Email: </p><label className="borderbot" htmlFor="">{userdata.email}</label></div>
                    <div className="d3"><p>Phone: </p><label className="borderbot" htmlFor="">{userdata.phoneNumber}</label></div>
                    <div className="d4"><p>Preffered NGO: </p><label className="borderbot" htmlFor="">{userdata.prefngo}</label></div>
                    <div className="d4"><p>Recent Activity:</p>
                     <p className='pofrecent'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea optio velit aliquid dolor aliquam illo quis numquam eligendi sed cumque.</p></div>
                </div>

            </div>
        </>
    )
}

export default Userdata
