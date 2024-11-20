import {Authentication} from "./Authentication";
import {Registration} from "./Registration";
import "./styles/style.css"
import {Main} from "./Main";
import {useState} from "react";

function App() {
 const[isAuthenticated, setIsAuthenticated] = useState(false);

 return (

     <Authentication/>

 )




}

export default App;
