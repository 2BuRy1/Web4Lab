import {Authentication} from "./Authentication";
import {Registration} from "./Registration";
import "./styles/style.css"
import {Main} from "./Main";
import {useEffect, useState} from "react";
import {InputText} from "./props/Input";

function App() {
 const[isAuthenticated, setIsAuthenticated] = useState(false);


 function handleRequest() {

  let requestContent = {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGcJIUzI1NiJ9.eyJzdWIiOiJsb2wiLCJpYXQiOjE3MzIxMjIxOTMsImV4cCI6MTczMjIwODU5M30.2crKNfMG7-OFyz0FUJ2mryiXBkOHGCAagrqtZYy516I",
   },
  }

  fetch("http://localhost:8080/rofls", requestContent ).then(response => response.json())
      .then(data => console.log(data));

 }





//eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZXAiLCJpYXQiOjE3MzIxMjE3MzIsImV4cCI6MTczMjIwODEzMn0._vKZMqYiIgYBZdl7REklDZ0G8n6n90Qn87QsRp_-R1I

 return (
     <button onClick={handleRequest} className="authInputs"></button>
//<Authentication/>
 )




}

export default App;
