import React from 'react'
import { Link } from 'react-router-dom';
import Profile from './profile.jpeg';
const Ngodata = () => {
    return (
        <>
            <div className="ngodata">
                {/* <div className="profile">
                    <img src={Profile} alt=" " />
                </div> */}
                <div className="ngod1">
                    <div className="four">
                        <div className="d1"><p>Name:</p><label className="borderbot" htmlFor="">saiRatan</label></div>
                        <div className="d2"><p>Email:</p><label className="borderbot" htmlFor="">Email212@gmail.com</label></div>

                        <div className="d3"><p>Phone:</p><label className="borderbot" htmlFor="">Phone21311312</label></div>
                        <div className="d4"><p>Social Media link1: </p><label className="borderbot" htmlFor="">Lorem ipsum </label></div>
                        <div className="d5"><p>Social Media link2: </p><label className="borderbot" htmlFor="">Lorem ipsum </label></div>
                    </div>
                    <div className="next">
                        <div className="d4"><p>Category: </p><label className="borderbot" htmlFor="">Lorem ipsum </label></div>
                        <div className="d5"><p>Registration Number: </p><label className="borderbot" htmlFor="">Lorem ipsum </label></div>
                        <div className="d6"><p>Pancard Number: </p><label className="borderbot" htmlFor="">Lorem ipsum </label></div>
                        <div className="d4"><p>Type: </p><label className="borderbot" htmlFor="">Lorem ipsum </label></div>

                        <div className="d4"><p>Payment Info: </p><label className="borderbot" htmlFor="">Lorem ipsum </label></div>
                    </div>
                    <div className="des1">
                        <div className="d4"><p>Description:</p>

                            <p className='pofrecent'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea optio velit aliquid dolor aliquam illo quis numquam eligendi sed cumque.</p></div>
                    </div>
                    <div className="des2">
                        <div className="d4"><p>Recent Activity:</p>
                            <p className='pofrecent'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea optio velit aliquid dolor aliquam illo quis numquam eligendi sed cumque.</p></div>
                    </div>
                </div>
                <Link to="/Donation">
                    <button className="but1" type="submit">Donate</button>
                </Link>
                <Link to="/grouppage">
                    <button className="but2" type="submit">Join group</button>
                </Link>

            </div>
        </>
    )
}

export default Ngodata
