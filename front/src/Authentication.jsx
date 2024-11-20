import {InputText} from "./props/Input";
import {useState} from "react";
import {Button} from "./props/Button";


export function Authentication() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function handlePassword(e){
        setPassword(e.target.value);
    }


    function handleLogin(e){
        setLogin(e.target.value);
    }


    function validate(){
        return !((login.trim().length > 0 || password.trim().length > 0) && (login.trim() === "" || password.trim() === ""));


    }

    function handleSubmit(){
        let requestContent = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb2wiLCJpYXQiOjE3MzIxMjIxOTMsImV4cCI6MTczMjIwODU5M30.2crKNfMG7-OFyz0FUJ2mryiXBkOHGCAagrqtZYy516I",
            },
            body: JSON.stringify({
                username: login,
                password: password
            })
        }

        fetch("http://localhost:8080/login", requestContent ).then(response => response.json())
            .then(data => console.log(data));


    }



    return(
        <div className="authentication">
        <h1>Authentication</h1>
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
        <Button onClick={handleSubmit}
                value="Вход"
                id = "registerButton"
                class="authInputs"
        />
        </div>
    )



}