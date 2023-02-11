import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'

function Ele1(props) {
    let temp_f = () => {
        document.getElementById('form10').innerHTML = props.txt;
    }
    return (
        <>
            <li onClick={temp_f}>{props.txt}</li>
        </>
    );
}
export default class Ngosignup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.style1 = {};
    }
    fun1 = async (e) => {
        e.preventDefault();
        let str1 = document.getElementById('form12').value;
        let str2 = document.getElementById('form11').value;
        if (str1 != str2) {
            console.log('in fun1')
            for (let i = 1; i <= 12; i++) {

                document.getElementById(`form${i}`).value = '';
            }
        } else {
            await fetch('http://localhost:4000/api/ngo/addngo', {
                method: "POST",
                body: JSON.stringify({
                    name: document.getElementById('form1').value,
                    email: document.getElementById('form2').value,
                    phoneNumber: document.getElementById('form3').value,
                    category: document.getElementById('form4').value,
                    paymentUPI: document.getElementById('form5').value,
                    regNo: document.getElementById('form6').value,
                    panNo: document.getElementById('form7').value,
                    description: document.getElementById('form8').value,
                    // socialLinks:  document.getElementById('form9').value,
                    typeOfNGO: document.getElementById('form10').value,
                    password: document.getElementById('form11').value
                }),
                headers: {
                    "Content-type": "application/json"
                }
            }

            );
            // navigate('/login')
        }
    }
    render() {
        return (
            <div>
                <h1>Ngo form for sign up</h1>
                <div className="c2">
                    <form id="signupsubmit" onSubmit={this.fun1} >
                        <input type="text" className="name" id="form1" placeholder='Name' /><br />
                        <input type="email" id="form2" className="name" placeholder='email' /><br />
                        <input type="number" id="form3" className="name" placeholder='Phonenumber' /><br />
                        <input type="text" id="form4" className="name" placeholder='category' /><br />
                        <input type="text" id="form5" className="name" placeholder='paymentinfo' /><br />
                        <input type="text" id="form6" className="name" placeholder='reg_no' /><br />
                        <input type="text" id="form7" className="name" placeholder='pancard_no' /><br />
                        <input type="password" id='form11' className="name" placeholder='password' /><br />
                        <input type="password" id='form12' className="name" placeholder='confirmpassword' /><br />

                        <textarea id="form8" className="name des" cols="30" rows="10" placeholder='Description'></textarea><br />
                        <textarea id="form9" className="name des" cols="30" rows="10" placeholder='Social Media Links'></textarea><br />




                        <select className="form-select cwidth" aria-label="Default select example">
                            <option id='form10' selected>Select the type of NGO</option>
                            <option value="1">Ango</option>
                            <option value="2">Bngo</option>
                            <option value="3">Cngo</option>
                            <option value="3">Dngo</option>
                        </select>



                        {/* <div id='ngoform_drop'>
                            <span className='cat'>Category</span> <div type="text" className="name applyhover" id='form10' placeholder='type_of_ngo'>Ango</div>
                            <div id='ngoform_drop_elements'>
                                <Ele1 txt='Ango' />
                                <Ele1 txt='Bngo' />
                                <Ele1 txt='Cngo' />
                                <Ele1 txt='Dngo' />
                            </div> */}
                        <br />
                        <button type='submit' className='submit '>submit</button>
                    </form>
                </div>
            </div>
        );
    }
}