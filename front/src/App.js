import {Authentication} from "./Authentication";
import {Registration} from "./Registration";
import "./styles/style.css"
import {Main} from "./Main";

function App() {

    let flag = true;

    if (window.location.pathname === "/") {
        return (
            <Main/>
        )
    }


    if (window.location.pathname === "/login") {
        if (flag) {
            return (
                <Authentication/>
            )
        }
        window.location.pathname = "/";
    }
    if (window.location.pathname === "/register") {
        return (
            <Registration/>
        )
    }


}

export default App;
