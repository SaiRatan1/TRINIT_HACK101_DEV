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
                    category: document.getElementById('form5').value,
                    paymentUPI: document.getElementById('form4').value,
                    regNo: document.getElementById('form6').value,
                    panNo: document.getElementById('form7').value,
                    description: document.getElementById('form8').value,
                    // socialLinks:  document.getElementById('form9').value,
                    typeOfNGO: document.getElementById('form10').innerHTML,
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
                <form id='ngoform' onSubmit={this.fun1} >
                    <div id='ngoforma'>
                        <input type="text" id="form1" placeholder='Name' />
                        <input type="email" id="form2" placeholder='email' />
                        <input type="number" id="form3" placeholder='Phonenumber' />
                        <input type="text" id="form4" placeholder='category' />
                        <input type="text" id="form5" placeholder='paymentinfo' />
                        <input type="text" id="form6" placeholder='reg_no' />
                        <input type="text" id="form7" placeholder='pancard_no' />
                        <input type="password" id='form11' placeholder='password' />
                        <input type="password" id='form12' placeholder='confirmpassword' />
                    </div>
                    <div id='ngoformb'>
                        <textarea id="form8" cols="30" rows="10" placeholder='Description'></textarea>
                        <textarea id="form9" cols="30" rows="10" placeholder='Social Media Links'></textarea>
                    </div>
                    <div id='ngoformc'>
                        <div id='ngoform_drop'>
                            <div type="text" id='form10' placeholder='type_of_ngo'>Ango</div>
                            <div id='ngoform_drop_elements'>
                                <Ele1 txt='Ango' />
                                <Ele1 txt='Bngo' />
                                <Ele1 txt='Cngo' />
                                <Ele1 txt='Dngo' />
                            </div>
                        </div>
                    </div>
                    <button type='submit'>submit</button>
                </form>
            </div>
        );
    }
}