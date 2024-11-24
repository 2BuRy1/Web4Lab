import { InputText } from "./props/Input";
import { useRef, useState } from "react";
import { Button } from "./props/Button";
import { useNavigate } from "react-router-dom";

export function Authentication({ setIsAuthenticated }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const usernameRef = useRef(null);
    const navigate = useNavigate();

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleLogin(e) {
        setLogin(e.target.value);
    }

    function validate() {
        return !((login.trim().length > 0 || password.trim().length > 0) && (login.trim() === "" || password.trim() === ""));
    }

    function handleSubmit() {
        let requestContent = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: login,
                password: password,
            }),
        };

        if (!validate()) {
            return;
        }

        setErrorMessage("");

        fetch("http://localhost:8080/login", requestContent)
            .then(response => {
                if (response.ok) {
                    response.json().then((data) => {
                        if (data.token) {
                            localStorage.setItem("jwt", data.token);
                            setIsAuthenticated(true);
                            navigate("/main");
                        }
                    });
                } else {
                    if(response.status === 409) {
                        setErrorMessage("Имя пользователя не найдено или неверный пароль");
                    }
                }
            })
            .catch(() => {
                setErrorMessage("Ошибка подключения к серверу");
            });
    }

    return (
        <div className="authenticationContainer">
            <div className="registerNavigate">
                <Button
                    onClick={() => navigate("/register")}
                    value="Зарегистрироваться"
                    id="toRegisterButton"
                />
            </div>
            <div className="authentication">
                <h1>Authentication</h1>
                <InputText
                    id="username"
                    type="text"
                    name="Login"
                    ref={usernameRef} // Привязка ссылки к полю ввода
                    onChange={(e) => handleLogin(e)}
                    value={login}
                    class="authInputs"
                />

                <InputText
                    id="password"
                    type="password"
                    name="Password"
                    onChange={(e) => handlePassword(e)}
                    value={password}
                    class="authInputs"
                />
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                <Button
                    onClick={handleSubmit}
                    value="Вход"
                    id="registerButton"
                    class="authInputs"
                />
            </div>
        </div>
    );
}