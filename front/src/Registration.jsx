import {InputText} from "./props/Input";
import {useState} from "react";
import {Button} from "./props/Button";


export function Registration() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    function handlePassword(e){
        setPassword(e.target.value);
    }

    function handleSecondPassword(e){
        setSecondPassword(e.target.value);
    }


    function handleLogin(e){
        setLogin(e.target.value);
    }


    function validate(){
        if(password !== secondPassword){
            console.log("lolka")
            return false;
        }



        return !((login.trim().length > 0 || password.trim().length > 0 || secondPassword.trim() > 0)
            && (login.trim() === "" || password.trim() === "" || secondPassword.trim() === ""));


    }

    function handleSubmit(){
        console.log(validate());



    }



    return(
        <div className="registration">
            <h1>Registration</h1>
            <InputText id="username"
                       type="text"
                       name="Login"
                       onChange ={(e) =>handleLogin(e)}
                       value = {login}
                       class="authInputs"
            />
            <InputText id="password"
                       type="password"
                       name="Password"
                       onChange ={(e) =>handlePassword(e)}
                       value ={password}
                       class="authInputs"
            />
            <InputText id="password"
                       type="password"
                       name="Password"
                       onChange ={(e) =>handleSecondPassword(e)}
                       value ={secondPassword}
                       class="authInputs"
            />
            <Button onClick={handleSubmit}
                    value="Зарегистрироваться"
                    id = "registerButton"
                    class="authInputs"
            />
        </div>
    )



}