import {InputText} from "./props/Input";
import {useState} from "react";
import {Button} from "./props/Button";


export function Authentication() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function handlePassword(e){
        setLogin(e.target.value);
    }


    function handleLogin(e){
        setLogin(e.target.value);
    }


    function validate(){
        return !((login.trim().length > 0 || password.trim().length > 0) && (login.trim() === "" || password.trim() === ""));


    }

    function handleSubmit(){
        if(!validate()){


        }



    }



    return(
        <div className="authentication">
        <h1>Authentication</h1>
        <InputText id="username" type="text" name="Login" onChange ={(e) =>handleLogin(e)} value = {login} />
        <InputText id="password" type="password" name="Password" onChange ={(e) =>handlePassword(e)} value ={password} />
        <Button onClick={handleSubmit} value="Вход" id = "registerButton"></Button>
        </div>
    )



}