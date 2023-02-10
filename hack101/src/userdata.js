import React from 'react'
import Profile from './profile.jpeg';
const Userdata = () => {
    return (
        <>
            <div className="userdata">
                <div className="profile">
                    <img src={Profile} alt=" " />
                </div>
                <div className="data">
                    <div className="d1"><p>Name:</p><label className="borderbot" htmlFor="">saiRatan</label></div>
                    <div className="d2"><p>Email:</p><label className="borderbot" htmlFor="">Email212@gmail.com</label></div>
                    <div className="d3"><p>Phone:</p><label className="borderbot" htmlFor="">Phone21311312</label></div>
                    <div className="d4"><p>Recent Activity:</p>
                     <p className='pofrecent'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea optio velit aliquid dolor aliquam illo quis numquam eligendi sed cumque.</p></div>
                </div>

            </div>
        </>
    )
}

export default Userdata
