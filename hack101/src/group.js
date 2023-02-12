import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './chat.css'
import { useLocation } from 'react-router-dom';
import CredContext from './context/Credentials/credContext'

class ChatSystem extends React.Component {

    constructor(props){

        super(props);
        this.state ={
            obj1: <br/>,
            msg:1
        }
    }
     
    fun_sender = () => {
        let var1 = document.getElementById('chatinput');
        let str1 = var1.value;
        if(str1!==''){
            var1.value = '';
            let num = this.state.msg;
            let arr = [this.state.obj1,<div className='chatarealeft' key={`${num}`}>{str1}</div>];
            this.setState({obj1:arr,msg:num+1})
            fetch(`/formchatarea?ider=${this.props.groupid}&msg=${str1}`);
        }

    }
    render() {
        return (
            <>
            <h2 className='group my-1'>Group Chat</h2>
                <div id='chatbody'>
                    <div className="container bg-dark text-white">
                        <br />
                        <div className="container bg-dark text-white">
                            <div className="container bg-light text-dark">
                                <div id='chatarea'>
                                        {this.state.obj1}
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-sm-10">

                                    <div className="input-group">
                                        <span className="input-group-text">Text</span>
                                        <input id='chatinput' spellCheck='false' type="text" className="form-control" placeholder="Username"></input>
                                    </div>

                                </div>
                                <div className="col-sm-2">
                                    <button id='chatsend' onClick={this.fun_sender} type="button" className="btn btn-outline-primary">send</button>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>

                </div>

            </>
        );
    }
    componentDidMount(){
        if(this.state.msg==1){
            let rows = [];
            fetch(`/for_init_chat?author=${this.props.groupid}`).then(data => data.json()).then(data => {
                rows = data;
                let arr1 = [];
                let num1 = this.state.msg;
                for(let i=0;i<rows.length;i++){
                    let eler1;
                    if(rows[i].ider == this.props.ider){
                        eler1 = <div key={`${num1}`} className='chatarearight'>rows[i].txt</div>; 
                    }
                    else{
                        eler1 = <div key={`${num1}`} className='chatarealeft'>rows[i].txt</div>; 
                    }
                    arr1.push(eler1);
                    num1+=1;
                }
                this.setState({obj1:arr1,msg:num1});
            });

            var fun1 = (obje) =>{
                fetch(`forchatareaafter?pointer=${obje.state.msg}`).then(data => data.json()).then(data => {
                    rows = data;
                    let arr1 = [];
                    let num1 = obje.state.msg;
                    for(let i=0;i<rows.length;i++){
                        let eler1;
                        eler1 = <div key={`${num1}`} className='chatarealeft'>rows[i].txt</div>; 
                        arr1.push(eler1);
                        num1+=1;
                    }
                    obje.setState({obj1:arr1,msg:num1});
                }).catch(error => {
                    console.log('');
                });
                setTimeout(function(){fun1(obje);},2000);
            }
            setTimeout(()=>fun1(this),2000);
        }
    }
}

export default function Group(){
    const credentials = useContext(CredContext);
    console.log(credentials.credentials);

    const match = useLocation();
    console.log(match.pathname)
    return <ChatSystem/>
}