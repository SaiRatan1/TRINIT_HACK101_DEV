import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import CredContext from '../context/Credentials/credContext'

const Login = () => {
    const credentials = useContext(CredContext);


    const navigate = useNavigate();
    const [user, setUser] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {  //Checking for a valid user credentials
        let res;
        e.preventDefault();
        if (!user.email || !user.password) {
            alert('Invalid Credentials');
        }
        else {
            const { email, password } = user;
            res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    { email, password }
                )
            })
        }

        // if success, '/home'
        // else, '/'
        const data = await res.json();
        if (res.status === 400 || !data) {
            console.log('here')
            alert('Invalid Credentials')
        }
        else {
            console.log(user.email, "this is from function")
            // credentials.setUser(user.email);
            navigate('/home');
        }
    }


    return (
        <>
            <div className="container">
                <div className="c1">
                    <h1>Login</h1>
                </div>

                <div className="c2">
                    <form onSubmit={handleSubmit} method="POST">
                        <input type="text" name="fphone" placeholder="email" className="phone" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} /><br />
                        <input type="password" name="fpass" placeholder="Password" className="pass" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} /><br />
                        <input type="submit" name="fsubmit" className="submit" value="Login" />
                    </form>
                    <p className="forgot">
                        <Link to="/forgot" >Forgot password?</Link>
                    </p>
                    <hr />
                    <div className="signupbuttons">
                        <Link to="/usersignup">
                            <button className="but1" type="submit">Sign up as a philanthropist</button>
                        </Link>
                        <Link to="/ngosignup">
                            <button className="but2" type="submit">Sign up as an NGO</button>
                        </Link>
                    </div>
                </div>
                <div name="invalidname" className="invalid" >
                </div>

            </div>
        </>
    )
}

export default Login