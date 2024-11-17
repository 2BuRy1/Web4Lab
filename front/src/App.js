import {Form, SubmitButton} from "./props/Input";
import {Authentication} from "./Authentication";
import {Registration} from "./Registration";
import "./styles/style.css"

function App() {

  if(window.location.pathname === "/"){
    return (
        <div>
          <h1>There will be main page</h1>
        </div>
    )
  }


  if (window.location.pathname === "/login") {
    return (
        <Authentication/>
    )
  }
  if(window.location.pathname === "/register") {
    return (
        <Registration/>
    )
          }



}

export default App;
